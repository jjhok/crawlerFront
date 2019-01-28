<template>
    <div id="login">
        <v-layout column wrap class="ma-2">
            <v-card>
                <v-card-title primary-title >
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
                    <v-btn class="item" color="info" @click="submit" :loading="isLoading">TEST</v-btn>
                    <v-btn class="item" color="primary" @click="save" :loading="isSaving">SAVE</v-btn>
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
                isLoading: false,
                isSaving: false,
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
                this.isLoading = true;

                var params = {
                        login: this.login,
                        url: this.url,
                        method: this.crawlingMethod,
                    };
                
                if (this.login) {
                    var jsonTemplate = this._toJSON(this.template);
                    if (jsonTemplate === null) {
                        this.isLoading = false;
                        return;
                    }
                    params['inputDict'] = jsonTemplate;
                }

                axios.post('/api/test/login', params, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                .then((response) => {
                    this.response = response.data;
                    console.log(this.response);

                }).catch((response) => {
                    console.log(response);
                    this.response = response;
                }).then(() => {
                    this.isLoading = false;
                })
            },
            save() {
                this.isSaving = true;
                
                this.$inputDict['method'] = this.crawlingMethod;
                this.$inputDict['login'] = this.login;
                this.$inputDict['loginUrl'] = this.url;
                this.$inputDict['loginTemplate'] = this.template;
                
                setTimeout(() => {
                    this.isSaving = false;
                }, 1000)
            },
            _toJSON(template) {
                let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
                let correct = template.replace(/\n/gmi, "").trim().replace(regex, ''); 
                // let correct = template.replace(/\n/gmi, "").replace(/\'/gmi,"\"").trim().replace(regex, ''); 
                console.log(correct);
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
    margin: 10px;
  }
  .input-text {
      margin-left: 20px;
      margin-right: 20px;
  }
</style>