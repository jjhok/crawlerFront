<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <BaseInfo/>
      <URLParse />
    </v-content>
  </v-app>
</template>

<script>
import BaseInfo from './components/BaseInfo.vue'
import URLParse from './components/URLParse.vue'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  name: 'App',
  components: {
    BaseInfo,URLParse
  },
  data () {
    return {
      //
    }
  }
}
</script>
