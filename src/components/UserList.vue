<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
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

import {API, graphqlOperation} from "aws-amplify";
import {listUsers} from "@/graphql/queries";
import * as R from 'ramda';

export default {
  name: 'UserList',
  props: {},
  data() {
    return {
      users: [],
      nextToken: null
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        this.users = R.path(['data', 'listUsers', 'items'])(usersData);
        this.nextToken = R.path(['data', 'listUsers', 'nextToken'])(usersData);
      } catch (e) {
        console.log(e);
      }
    }
  }
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