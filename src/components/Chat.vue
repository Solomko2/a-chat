<template>
  <div class="chat-view">
    <div class="chat-view__sidebar">
      <UserList />
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import {API, Auth, graphqlOperation} from "aws-amplify";
import {getUser} from "@/graphql/queries";
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
  props: {},
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if (userInfo) {
        const userId = userInfo.attributes.sub;

        const userData = await API.graphql(graphqlOperation(getUser, {
          id: userId
        }));

        if(userData.data.getUser) {
          console.log('User is already exist!');
          return;
        }

        const newUser = {
          id: userId,
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
