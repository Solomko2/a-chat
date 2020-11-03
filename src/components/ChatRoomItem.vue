<template>
  <q-item>
    <q-item-section avatar>
      <img :src="getUserImage"
           :alt="getUserImage">
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ getUsersNames }}</q-item-label>
      <q-item-label caption>{{ getLastMessageUserName }}: {{ getLastMessage }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

import * as R from 'ramda';

export default {
  name: 'ChatRoomItem',
  props: {
    room: {},
    currentUserID: String,
    currentChatRoomID: String,
  },
  data() {
    return {
      onUpdateChatRoomSubscription: null
    }
  },
  computed: {
    getLastMessageUserName() {
      return R.path(['lastMessage', 'user', 'name'])(this.room);
    },
    getLastMessage() {
      return R.path(['lastMessage', 'body'])(this.room);
    },
    getUsersNames() {
      return R.compose(
          R.join(', '),
          R.map(R.path(['user', 'name'])),
          R.reject(R.pathEq(['user', 'id'], this.currentUserID)),
          R.path(['chatRoomUsers', 'items']),
      )(this.room);
    },
    getUserImage() {
      return R.compose(
          R.head(),
          R.map(R.path(['user', 'imageUrl'])),
          R.reject(R.pathEq(['user', 'id'], this.currentUserID)),
          R.path(['chatRoomUsers', 'items']),
      )(this.room);
    }
  },
}
</script>
