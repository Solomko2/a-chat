<template>
  <q-list class="user-list">
    <q-item-label header>Chats:</q-item-label>
    <q-item clickable
            class="user-list__item cursor-pointer" v-for="room in rooms"
            :key="room.id"
            v-on:click="onClickRoom(room)">
      <q-item-section avatar>
        <img :src="getUserImage(currentUserID)(room)"
             :alt="getUserImage(currentUserID)(room)">
      </q-item-section>
      <q-item-section>
        <q-item-label>{{getUsersNames(currentUserID)(room)}}</q-item-label>
        <q-item-label caption></q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import * as R from 'ramda';

export default {
  name: 'ChatRooms',
  props: {
    onClickRoom: {
      type: Function
    },
    rooms: {
      type: Array
    },
    currentUserID: {
      type: String
    }
  },
  computed: {
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
