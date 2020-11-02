<template>
  <div class="chat-room flex column justify-between">
    <div v-if="pending || createChatRoomPending" class="pending-screen">
      <q-spinner-hourglass
          color="primary"
          size="50px"
      />
    </div>
    <div v-if="!pending && !createChatRoomPending">
      <div v-if="currentChatRoomID && currentUserID">
        <Messages class="chat-room__messages"
                  :currentUserID="currentUserID"
                  :messages="messages" />
        <SendMessage class="chat-room__sender"
                     :currentUserID="currentUserID"
                     :currentChatRoomID="currentChatRoomID"
                     :onSendHandler="createMessage"/>
      </div>
    </div>
  </div>
</template>

<script>

// import { API } from "aws-amplify";
import Messages from "./Messages";
import SendMessage from "./SendMessage.vue";
import {API, graphqlOperation} from "aws-amplify";
import {createMessage, updateChatRoom} from "@/graphql/mutations";
import {messagesByChatRoom} from "@/graphql/queries";
import * as R from 'ramda';

export default {
  name: "ChatRoomView",
  components: {
    Messages,
    SendMessage,
  },

  props: {
    currentUserID: String,
    currentChatRoomID: String,
    createChatRoomPending: Boolean
  },
  data() {
    return {
      messages: [],
      pending: false,
      updateChatRoomLastMessagePending: false
    };
  },
  watch: {
    currentChatRoomID(currentChatRoomID) {
      this.fetchMessagesOfChatRoom(currentChatRoomID);
    }
  },
  methods: {
    async updateChatRoomLastMessage(messageID) {
      this.updateChatRoomLastMessagePending = true;
      try {
        await API.graphql(graphqlOperation(updateChatRoom, {
          input: {
            id: this.currentChatRoomID,
            lastMessageID: messageID
          }
        }))
      } catch (e) {
        console.log('updateChatRoomLastMessage', e);
      } finally {
        this.updateChatRoomLastMessagePending = false;
      }
    },
    async createMessage(message) {
      try {
        const newMessageData = await API.graphql(graphqlOperation(createMessage, {
          input: message
        }));

        await this.updateChatRoomLastMessage(newMessageData.data.createMessage.id);
      } catch (e) {
        console.log('createMessage: ', e);
      }
    },
    async fetchMessagesOfChatRoom(currentChatRoomID) {
      try {
        this.pending = true;
        const messagesData = await API.graphql(graphqlOperation(messagesByChatRoom, {
          chatRoomID: currentChatRoomID,
          sortDirection: "DESC"
        }));

        this.messages = R.reverse(messagesData.data.messagesByChatRoom.items);
      } catch (e) {
        console.log('createMessage: ', e);
      } finally {
        this.pending = false;
      }
    },

  },
};
</script>