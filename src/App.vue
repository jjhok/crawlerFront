<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>JH Crawler</span>
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
      <BaseInfo />
      <URLParseInfo />
      <div v-for="item in this.$detailPageCount" :key="item.id">
        <DetailPageInfo />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import BaseInfo from './components/BaseInfo.vue'
import URLParseInfo from './components/URLParseInfo.vue'
import DetailPageInfo from './components/DetailPageInfo.vue';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  name: 'App',
  components: {
    BaseInfo,URLParseInfo, DetailPageInfo
  },
}
</script>
