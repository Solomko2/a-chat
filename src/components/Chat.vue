<template>
  <div class="chat-view">
    <header class="chat-view__header">
      <div>{{currentUserName}}</div>
      <slot name="logotBtn"></slot>
    </header>
    <div class="chat-view__room-content">
      <div class="chat-view__sidebar">
        <UserList :users="users"
                  :currentUserID="currentUserID"
                  :next-token="nextToken"
                  :createChatRoomCb="createChatRoom">
        <span class="pending-screen" v-if="contactsPending">
          <q-spinner-hourglass
              color="primary"
              size="2em"
          />
        </span>
        </UserList>

        <ChatRooms :on-click-room="moveToChatRoom"
                   :currentUserID="currentUserID"
                   :currentChatRoomID="currentChatRoomID"
                   :rooms="chatRooms">
        <span class="pending-screen" v-if="userPending">
          <q-spinner-hourglass
              color="primary"
              size="2em"
          />
        </span>
        </ChatRooms>
      </div>
      <div class="chat-view__content">
        <ChatRoomView :currentUserID="currentUserID"
                      :createChatRoomPending="createChatRoomPending"
                      :currentChatRoomID="currentChatRoomID" />
      </div>
    </div>
  </div>
</template>

<script>
import {API, Auth, graphqlOperation} from "aws-amplify";
import {listUsers} from "@/graphql/queries";
import {createChatRoom, createChatRoomUser, createUser} from "@/graphql/mutations";
import axios from 'axios';
import * as R from 'ramda';
import UserList from "@/components/UserList";
import ChatRoomView from "@/components/ChatRoomView";
import ChatRooms from "@/components/ChatRooms";
import {getUser} from "@/components/queries";
import { v4 as uuidv4 } from 'uuid';

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
    UserList,
    ChatRoomView,
    ChatRooms
  },
  data() {
    return {
      currentUserName: null,
      currentUserID: null,
      currentChatRoomID: null,
      users: [],
      nextToken: null,
      userPending: false,
      contactsPending: false,
      createChatRoomPending: false,
      userData: {},
      userInfo: {}
    };
  },
  async created() {
    this.contactsPending = true;

    await this.fetchUser();
    await this.fetchContacts();
  },
  computed: {
    chatRooms() {
      return R.compose(
          R.path(['data', 'getUser', 'chatRoomUsers', 'items']),
          R.defaultTo([])
      )(this.userData)
    }
  },
  methods: {
    moveToChatRoom(room) {
      this.currentChatRoomID = room.chatRoomID;
    },
    async createChatRoom(user) {
      this.createChatRoomPending = true;

      try {
        const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {
          input: {
            lastMessageID: uuidv4()
          }
        }));

        if (!newChatRoomData.data) {
          console.log('Failed to create chat room');
          return;
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;

        await API.graphql(graphqlOperation(
            createChatRoomUser,
            {
              input: {
                userID: user.id,
                chatRoomID: newChatRoom.id
              }
            })
        ).catch(e => {
          console.log(1, e);
        });

        await API.graphql(graphqlOperation(
            createChatRoomUser,
            {
              input: {
                userID: this.currentUserID,
                chatRoomID: newChatRoom.id
              }
            })
        ).catch(e => {
          console.log(2, e);
        });

        this.currentChatRoomID = newChatRoom.id;

        this.userData = await API.graphql(graphqlOperation(getUser, {
          id: this.currentUserID
        }));

      } catch (e) {
        console.log('createChatRoom: ',  e);
      } finally {
        this.createChatRoomPending = false;
      }
    },
    async fetchContacts() {
      this.contactsPending = true;

      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        this.users = R.path(['data', 'listUsers', 'items'])(usersData);
        this.nextToken = R.path(['data', 'listUsers', 'nextToken'])(usersData);
      } catch (e) {
        console.log('fetchContacts', e);
      } finally {
        this.contactsPending = false;
      }
    },
    async fetchUser() {
      this.userPending = true;

      try {
        this.userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

        if (this.userInfo) {
          this.currentUserID = this.userInfo.attributes.sub;
          this.currentUserName = this.userInfo.username;

          this.userData = await API.graphql(graphqlOperation(getUser, {
            id: this.currentUserID
          }));

          if (this.userData.data.getUser) {
            console.log('User is already exist!');
            return;
          }

          const newUser = {
            id: this.currentUserID,
            name: this.userInfo.username,
            imageUrl: await getRandomImage(),
            status: 'Some status',
          };

          await API.graphql(graphqlOperation(createUser, {
            input: newUser
          }))
        }
      } catch (e) {
        console.log(`fetchUser: `, e);
      } finally {
        this.userPending = false;
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
  flex-shrink: 0;
}

.chat-view__content {
  width: 100%;
}
</style>
