<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id" v-on:click="createChatRoomCb(user)">
        <div class="user">
          <div class="user__image">
            <img v-bind:src="user.imageUrl" v-bind:alt="user.imageUrl">
          </div>
          <div class="user__content">
            <div class="user__name">
              {{ user.name }}
            </div>
            <div class="user__status">
              {{ user.status }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
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

<style scoped>
  ul {
    display: block;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    border-bottom: 1px solid #ccc;
    padding: 8px;
    cursor: pointer;
  }

  .user {
    display: flex;
  }

  .user__content {
    display: flex;
    flex-direction: column;
  }

  .user__image {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 8px;
    overflow: hidden;
  }

  .user__image > img {
    width: 100%;
    height: auto;
  }

</style>