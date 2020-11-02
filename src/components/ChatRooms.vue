<template>
  <q-list class="user-list">
    <q-item-label header>Chats:</q-item-label>
    <slot></slot>
    <q-item clickable
            v-for="room in rooms"
            class="user-list__item cursor-pointer"
            :class="{ active: room.chatRoomID === currentChatRoomID }"
            :key="room.id"
            v-on:click="onClickRoom(room)">
      <q-item-section avatar>
        <img :src="getUserImage(currentUserID)(room)"
             :alt="getUserImage(currentUserID)(room)">
      </q-item-section>
      <q-item-section>
        <q-item-label>{{getUsersNames(currentUserID)(room)}}</q-item-label>
        <q-item-label caption>{{getLastMessageUserName(room)}}: {{getLastMessage(room)}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

import * as R from 'ramda';

export default {
  name: 'ChatRooms',
  props: {
    currentChatRoomID: String,
    onClickRoom: Function,
    rooms: Array,
    currentUserID: String
  },
  computed: {
    getLastMessageUserName: () => (room) => {
      return R.path(['chatRoom', 'lastMessage', 'user', 'name'])(room);
    },
    getLastMessage: () => (room) => {
      return R.path(['chatRoom', 'lastMessage', 'body'])(room);
    },
    getUsersNames: () => (userId) => (room) => {
      return R.compose(
          R.join(', '),
          R.map(R.path(['user', 'name'])),
          R.reject(R.pathEq(['user', 'id'], userId)),
          R.path(['chatRoom', 'chatRoomUsers', 'items']),
      )(room);
    },
    getUserImage: () => (userId) => (room) => {
      return R.compose(
          R.head(),
          R.map(R.path(['user', 'imageUrl'])),
          R.reject(R.pathEq(['user', 'id'], userId)),
          R.path(['chatRoom', 'chatRoomUsers', 'items']),
      )(room);
    }
  }
}
</script>
