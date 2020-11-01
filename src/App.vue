<template>
  <div class="root">
    <amplify-authenticator>
      <div class="root__chat" v-if="authState === 'signedin' && user">
        <Chat />
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>

import Chat from "@/components/Chat";
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'App',
  components: { Chat },
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  data() {
    return {
      user: undefined,
      authState: undefined
    }
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.root {
  height: 100vh;
}

.root__chat {
  
}
</style>
