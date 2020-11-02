<template>
  <div class="full-width row justify-center">
    <div class="col-11">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus esse in natus. Aperiam debitis eos eum expedita itaque, minima porro, qui, quisquam quos ratione sint sit vitae? Deserunt, dolorum, quisquam.
      <q-chat-message
          v-for="message in messages"
          :text="[message.content]"
          :name="message.user.name"
          :sent="message.userId !== userId"
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
    userId: String,
  },
  data() {
    return {
      messages: [],
    };
  },
  async created() {

  },
  methods: {
  },
};
</script>
