<template>
  <div class="full-width row justify-center items-end">
    <div class="full-width">
      <q-input
          class="full-width"
          v-model="content"
          type="textarea"
          color="white"
          label="Enter your message here.."
          @keyup.enter="sendMessage"
      />
      <q-btn
          class="full-width"
          color="primary"
          label="SEND"
          v-on:click="sendMessage"
      />
    </div>
  </div>
</template>

<style>
</style>

<script>

export default {
  name: "SendMessage",
  props: {
    currentUserID: String,
    currentChatRoomID: String,
    onSendHandler: Function
  },
  data() {
    return {
      content: "",
    };
  },
  created() {},
  methods: {
    async sendMessage() {
      const { content, currentUserID, currentChatRoomID, onSendHandler } = this;

      if (!content) return;

      const message = {
        body: content,
        currentUserID,
        currentChatRoomID
      };

      onSendHandler(message);
    },
  },
};
</script>