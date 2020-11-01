<template>
  <div class="flex">
    <Messages v-if="currentUserID" v-bind:user-id="currentUserID"/>
    <SendMessage v-if="currentUserID" v-bind:user-id="currentUserID" />
  </div>
</template>

<style>
</style>

<script>

// import { API } from "aws-amplify";
import Messages from "./Messages";
import SendMessage from "./SendMessage.vue";

export default {
  name: "ChatRoom",
  components: {
    Messages,
    SendMessage,
  },
  created() {
  },
  props: {
    currentUserID: {
      type: String
    }
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {

  },
};
</script>