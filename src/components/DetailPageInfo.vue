<template>
    <div>
        <v-layout column wrap class="ma-2">
            <v-card>
                <v-card-title primary-title >
                    <div>
                        <h3 class="headline mb-0">Detail Page Info</h3>
                    </div>
                </v-card-title>
                <InputDictTemplate class="input-text" :defaultTemplate="template" @update="updateTemplate" />
                <v-layout row wrap justify-end>
                    <v-btn class="item" color="info" @click="submit(true)" :loading="isSaving" >SAVE and next DETAIL PAGES</v-btn>
                    <v-btn class="item" color="primary" @click="submit(false)" :loading="isLoading">GO</v-btn>
                </v-layout>
                <OutputBox v-if="response.length > 1" class="input-text" :msg="response" />
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import OutputBox from './OutputBox.vue';
import InputDictTemplate from './InputDictTemplate.vue';
import axios from 'axios';

    export default {
        components: {
            OutputBox, InputDictTemplate
        },
        data() {
            return {
                template: "",
                response: [],
                startNum: 0,
                endNum: 0,
                isLoading: false,
                isSaving: false,
            }
        },
        created() {
            this.getTemplate();
        },
        methods: {
            getTemplate() {
                axios.get('/api/template/detailPage', {
                    params: {
                        method: this.$inputDict['method']
                    }
                }).then(response => {
                    this.template = response.data;
                }).catch(response => {
                    console.log(response)
                })
            },
            updateTemplate(newValue) {
                this.template = newValue;
            },
            submit(isURLUpdate) {
                this.isLoading = true;

                var params = {
                    method: this.$inputDict['method'],
                    urls: this.$inputDict['pageUrls'],
                    inputDict: this._toJSON(this.template)
                }
                axios.post('api/test/nestedPage', params).then(response => {
                    this.response = response.data;

                    if (isURLUpdate) {
                        var indexName = params.inputDict[0].index;
                        var baseUrl = this.$inputDict['pageUrls'][0];
                        var parsingUrls = this.response[0][indexName];

                        axios.post('/api/utils/fullpath', {
                            baseUrl : baseUrl,
                            parsingUrls : parsingUrls
                        })
                        .then(response => {
                            this.$inputDict['pageUrls'] = response.data;
                            this.$detailPageCount++;
                            console.log(this.$inputDict['pageUrls']);
                        }).catch(response => {
                            console.log(response)
                        })
                    }

                }).catch(response => {
                    console.log(response);
                }).then(() => {
                    this.isLoading = false;
                })
            },
            _toJSON(template) {
                let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
                let correct = template.replace(/\n/gmi, "").trim().replace(regex, ''); 
                // let correct = template.replace(/\n/gmi, "").replace(/\'/gmi,"\"").trim().replace(regex, ''); 
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