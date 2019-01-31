<template>
    <div id="crawler">
        <v-layout column wrap class="ma-2">
            <v-card>
                <v-card-title primary-title >
                    <v-layout row wrap justify-space-between align-center="">
                        <h3 class="headline mb-0">Cralwer Start!</h3>
                        <span>
                            <v-btn color="primary" @click="getInputData">GET INPUT DATA</v-btn>
                            <v-btn color="error" @click="submit">START!</v-btn>
                        </span>
                    </v-layout>
                </v-card-title>
                <InputDictTemplate class="input-text" :defaultTemplate="template" rows="5"/>
                <OutputTable :response='response' />
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import OutputBox from './OutputBox.vue';
import InputDictTemplate from './InputDictTemplate.vue';
import OutputTable from './OutputTable.vue';
import axios from 'axios';

    export default {
        components: {
            OutputBox, InputDictTemplate, OutputTable
        },
        data() {
            return {
                template: "",
                response: [],
                startNum: 0,
                endNum: 0,
                isLoading: false,
            }
        },
        watch: {
            $inputDict(newValue, oldValue) {
                console.log(newValue);
            }
        },
        methods: {
            getInputData() {
                this.template = JSON.stringify(this.$inputDict, null, 4)
            },
            submit(isURLUpdate) {
                this.isLoading = true;

                axios.post('api/crawler', this.$inputDict).then(response => {
                    this.response = response.data;

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