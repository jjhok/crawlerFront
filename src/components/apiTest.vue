<template>
    <div id="login">
        <v-layout column wrap class="ma-2">
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">기본 정보</h3>
                    </div>
                </v-card-title>
                <v-layout row justify-space-around align-start fill-height>
                    <v-flex xs6>
                        <v-select @input="log"
                            :items="crawlingMethodLists"
                            v-model="crawlingMethod"
                            label="Crawling Method"
                        ></v-select>
                    </v-flex>
                    <v-flex xs3>
                        <v-switch
                            class="item"
                            label="LOG IN"
                            v-model="login"
                            ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row wrap justify-space-around>
                    <v-text-field v-if="login" class="input-text" label="ID" v-model="id"></v-text-field>
                    <v-text-field v-if="login" class="input-text" type="password" label="Password" v-model="pwd"></v-text-field>
                </v-layout>
                <v-text-field class="input-text" label="URL" v-model="url"></v-text-field>
                <v-layout row wrap justify-end="">
                    <v-btn class="item" color="info" @click="getData">TEST!!</v-btn>
                </v-layout>
                <OutputBox v-if="response" class="input-text" :msg="response" />
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios';
    import OutputBox from './OutputBox.vue'

    export default {
        components: {
            OutputBox,
        },
        data() {
            return {
                login: false,
                id: "",
                pwd: "",
                url: "",
                response: null,
                crawlingMethodLists: ['bs4', 'selenium'],
                crawlingMethod: "",
            }
        },
        methods: {
            log() {
                console.log(this.crawlingMethod);
            },
            getData() {
                var params = {
                        url: this.url,
                        id: this.id,
                        pwd: this.pwd,
                        method: this.crawlingMethod
                    };
                console.log(params);

                axios.post('/api/test/login', {
                        hello: 'world'
                    })
                .then((response) => {
                    this.response = response.data;
                }).catch((response) => {
                    console.log(response);
                })
            }
        },
    }
</script>

<style scoped>
.resultContainer {
    height: 350px;
  }
 .item {
    min-height: 50px;
    min-width: 80px;
    margin: 20px;
  }
  .input-text {
      margin-left: 20px;
      margin-right: 20px;
  }
</style>