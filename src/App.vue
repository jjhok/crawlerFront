<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>JH Crawler</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <BaseInfo />
      <URLParseInfo />
      <div v-for="item in detailInfoPages" :key="item.id">
        <DetailPageInfo @add="addDetailInfoPage" @remove="removeDetailInfoPage" />
      </div>
      <Crawler />
    </v-content>
  </v-app>
</template>

<script>
import BaseInfo from './components/BaseInfo.vue'
import URLParseInfo from './components/URLParseInfo.vue'
import DetailPageInfo from './components/DetailPageInfo.vue';
import Crawler from './components/Crawler.vue';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  name: 'App',
  components: {
    BaseInfo,URLParseInfo, DetailPageInfo, Crawler
  },
  methods: {
    addDetailInfoPage() {
      this.detailInfoPages.push(DetailPageInfo);
    },
    removeDetailInfoPage() {
      console.log(this.detailInfoPages);
      this.detailInfoPages.pop();
    }
  },
  data() {
    return {
      detailInfoPages: [DetailPageInfo],
      sample: '[{"TITLE": [            "프로젝트산출물 WIKI 가이드"        ]    },    {        "TITLE": [            "IT팀 작업변경계획"        ] {        "TITLE": [            "Infra기획 파일공유"        ]    }]',
    }
  },
}
</script>
