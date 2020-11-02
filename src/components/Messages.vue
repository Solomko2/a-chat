<template>
  <div class="full-width row justify-center">
    <div class="col-11">
      <q-chat-message
          v-for="message in messages"
          :text="[message.body]"
          :name="message.user.name"
          :sent="message.user.id !== currentUserID"
          :key="message.id"
          :stamp="message.updatedAt"
      />

      <div class="message-pending">
        <q-spinner-dots v-if="createMessagePending" color='primary' size='30px'/>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>

export default {
  name: "Messages",
  components: {},
  props: {
    messages: Array,
    currentUserID: String,
    createMessagePending: Boolean
  }
};
</script>
