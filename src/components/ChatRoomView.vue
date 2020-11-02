<template>
  <div class="chat-room flex column justify-between" v-if="currentChatRoomID && currentUserID">
    <Messages :currentUserID="currentUserID"
              :messages="messages" />
    <SendMessage :currentUserID="currentUserID"
                 :currentChatRoomID="currentChatRoomID"
                 :onSendHandler="createMessage"/>
  </div>
</template>

<script>

// import { API } from "aws-amplify";
import Messages from "./Messages";
import SendMessage from "./SendMessage.vue";
import {API, graphqlOperation} from "aws-amplify";
import {createMessage} from "@/graphql/mutations";
import {messagesByChatRoom} from "@/graphql/queries";

export default {
  name: "ChatRoomView",
  components: {
    Messages,
    SendMessage,
  },

  props: {
    currentUserID: String,
    currentChatRoomID: String
  },
  data() {
    return {
      messages: [],
    };
  },
  watch: {
    currentChatRoomID(currentChatRoomID) {
      this.fetchMessagesOfChatRoom(currentChatRoomID);
    }
  },
  methods: {
    async createMessage(message) {
      try {
        await API.graphql(graphqlOperation(createMessage, {
          input: message
        }))
      } catch (e) {
        console.log('createMessage: ', e);
      }
    },
    async fetchMessagesOfChatRoom(currentChatRoomID) {
      try {
        const messagesData = await API.graphql(graphqlOperation(messagesByChatRoom, {
          chatRoomID: currentChatRoomID,
          sortDirection: "DESC"
        }));
        console.log(messagesData);

        this.messages = messagesData.data.messagesByChatRoom.items;

        console.log(this.messages);
      } catch (e) {
        console.log('createMessage: ', e);
      }
    },

  },
};
</script>