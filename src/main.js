import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import './quasar'
import VueChatScroll from 'vue-chat-scroll'

Amplify.configure(aws_exports);

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

new Vue({
  render: h => h(App),
}).$mount('#app')
