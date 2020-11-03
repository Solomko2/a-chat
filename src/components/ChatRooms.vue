<template>
  <q-list class="user-list">
    <q-item-label header>Chats:</q-item-label>
    <slot></slot>
    <div
        v-for="room in rooms"
        class="user-list__item cursor-pointer"
        :class="{ active: room.chatRoomID === currentChatRoomID }"
        :key="room.id"
        v-on:click="onClickRoom(room)">
      <ChatRoomItem :currentUserID="currentUserID"
                    :currentChatRoomID="currentChatRoomID"
                    :room="room.chatRoom"/>
    </div>
  </q-list>
</template>

<script>

import ChatRoomItem from "@/components/ChatRoomItem";

export default {
  name: 'ChatRooms',
  props: {
    currentChatRoomID: String,
    onClickRoom: Function,
    rooms: Array,
    currentUserID: String
  },
  components: {
    ChatRoomItem
  }
}
</script>
