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
                        <v-select 
                            :items="crawlingMethodLists"
                            v-model="crawlingMethod"
                            label="Crawling Method"
                            @input="getTemplate"
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
                <InputDictTemplate v-if="login" class="input-text" :defaultTemplate="template" @update="updateTemplate" />
                <v-text-field class="input-text" label="URL" v-model="url" ></v-text-field>
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
    import InputDictTemplate from './InputDictTemplate.vue';

    export default {
        components: {
            OutputBox,InputDictTemplate
        },
        mounted() {
            this.getTemplate();
        },
        data() {
            return {
                login: false,
                url: "",
                response: null,
                crawlingMethodLists: ['bs4', 'selenium'],
                crawlingMethod: 'bs4',
                template: "",
            }
        },
        methods: {
            updateTemplate(temp) {
                console.log("update");
                console.log(temp);
                
            },
            getTemplate() {
                axios.get('api/template/login', {
                    params: {
                        method: this.crawlingMethod
                    }
                })
                .then(response => {
                    this.template = response.data;
                }).catch(response => {
                    console.log(response);
                })
            },
            getData() {
                var params = {
                        url: this.url,
                        method: this.crawlingMethod,
                        inputDict: this.template,
                    };

                axios.post('/api/test/login', params)
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