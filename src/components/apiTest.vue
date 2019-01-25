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
                <v-text-field class="input-text" label="URL" v-model="url" placeholder="http://"></v-text-field>
                <v-layout row wrap justify-end="">
                    <v-btn class="item" color="info" @click="submit">TEST!!</v-btn>
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
            updateTemplate(newValue) {
                this.template = newValue;
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
            submit() {
                this.response = null;
                
                var params = {
                        url: this.url,
                        method: this.crawlingMethod,
                    };
                
                if (this.login) {
                    var jsonTemplate = this._toJSON(this.template);
                    params['inputDict'] = jsonTemplate;
                }

                axios.post('/api/test/login', params, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                .then((response) => {
                    this.response = response.data;
                }).catch((response) => {
                    this.response = response;
                    console.log("response");
                })
            },
            _toJSON(template) {
                let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
                let correct = template.replace(/\n/gmi, "").replace(/\'/gmi,"\"").trim().replace(regex, ''); 
                let json = null;
                try {
                    json = JSON.parse(correct);
                } catch(e) {
                    alert(e);
                } finally {
                    return json;
                }
                
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