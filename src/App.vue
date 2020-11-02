<template>
  <div class="root main-container">
    <amplify-authenticator>
      <div class="root__chat" v-if="authState === 'signedin' && user">
        <Chat>
          <template v-slot:logotBtn>
            <amplify-sign-out class="sign-out-btn"></amplify-sign-out>
          </template>
        </Chat>
      </div>
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
  }
}
</script>

<style>
</style>
