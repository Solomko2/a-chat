<template>
  <q-list class="user-list">
    <q-item-label header>Contacts:</q-item-label>
    <slot></slot>
    <q-item clickable
            class="user-list__item cursor-pointer" v-for="user in users"
            :key="user.id"
            v-on:click="createChatRoomCb(user)">
      <q-item-section avatar>
        <img :src="user.imageUrl" :alt="user.imageUrl">
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ user.name }}</q-item-label>
        <q-item-label caption>{{ user.updatedAt }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

export default {
  name: 'UserList',
  props: {
    createChatRoomCb: {
      type: Function
    },
    currentUserID: {
      type: String
    },
    users: {
      type: Array
    },
    nextToken: {
      type: String
    }
  },
}
</script>