<template>
  <div class="full-width row justify-center items-end">
    <div class="full-width">
      <q-input
          class="message-text-field full-width"
          v-model="content"
          type="textarea"
          color="white"
          :label="label"
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
  computed: {
    label() {
      return this.content.length ? '' : 'Enter text'
    }
  },
  methods: {
    async sendMessage() {
      const { content, currentUserID, currentChatRoomID, onSendHandler } = this;

      if (!content) return;

      const message = {
        body: content,
        userID: currentUserID,
        chatRoomID: currentChatRoomID,
      };

      onSendHandler(message);

      this.content = '';
    },
  },
};
</script>