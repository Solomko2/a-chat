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
  }
};
</script>
