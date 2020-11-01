<template>
  <div class="chat-view">
    <span v-if="pending">Loading ...</span>
    <div class="chat-view__sidebar">
      <UserList :users="users"
                :currentUserID="currentUserID"
                :next-token="nextToken"
                :createChatRoomCb="createChatRoom"/>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import {API, Auth, graphqlOperation} from "aws-amplify";
import {getUser, listUsers} from "@/graphql/queries";
import {createUser} from "@/graphql/mutations";
import axios from 'axios';
import * as R from 'ramda';
import UserList from "@/components/UserList";

/**
 *
 * @param {string} size = large, medium, thumbnail
 * @returns {Promise<AxiosResponse<any> | void>}
 */
const getRandomImage = async (size = 'thumbnail') => {
  return axios.get('https://randomuser.me/api?inc=picture')
      .then(R.path(['data', 'results', 0, 'picture', size]))
      .catch(err => console.log(err));
};

export default {
  name: 'Chat',
  components: {
    UserList
  },
  data() {
    return {
      currentUserID: null,
      users: [],
      nextToken: null,
      pending: false,
    };
  },
  async created() {
    this.pending = true;
    await this.fetchUser();
    await this.fetchUsers();
    this.pending = false;
  },
  methods: {
    async createChatRoom(user) {
      try {
        console.log(user);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchUsers() {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        this.users = R.path(['data', 'listUsers', 'items'])(usersData);
        this.nextToken = R.path(['data', 'listUsers', 'nextToken'])(usersData);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchUser() {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if (userInfo) {
        this.currentUserID = userInfo.attributes.sub;

        const userData = await API.graphql(graphqlOperation(getUser, {
          id: this.currentUserID
        }));

        if(userData.data.getUser) {
          console.log('User is already exist!');
          return;
        }

        const newUser = {
          id: this.currentUserID,
          name: userInfo.username,
          imageUrl: await getRandomImage(),
          status: 'Some status',
        };

        await API.graphql(graphqlOperation(createUser, {
          input: newUser
        }))
      }
    }
  },
}
</script>

<style scoped>
  .chat-view {
    display: flex;
  }

  .chat-view__sidebar {
    width: 250px;
    border-right: 1px solid #ccc;
  }
</style>
