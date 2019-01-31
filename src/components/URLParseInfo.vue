<template>
    <div id="urlparseinfo">
        <v-layout column wrap class="ma-2">
            <v-card>
                <v-card-title primary-title >
                    <div>
                        <h3 class="headline mb-0">URL 파싱</h3>
                    </div>
                </v-card-title>
                <v-layout row wrap>
                    <v-flex xs8>
                        <v-text-field class="input-text" label="URL with {var}" v-model="url" placeholder="http://"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-switch label="Serial data" v-model="isSerial" @change="!isSerial"></v-switch>
                </v-layout>
                <v-layout row wrap>
                    <v-text-field v-if="isSerial" class="input-text" label="Start number" v-model="startNum" placeholder="0"></v-text-field>
                    <v-text-field v-if="isSerial" class="input-text" label="End number" v-model="endNum" placeholder="0"></v-text-field>
                </v-layout>
                <InputDictTemplate class="input-text" :defaultTemplate="template" label="Parsing 을 위한 Array" rows="5" @update="updateTemplate" />
                <v-layout row wrap justify-end="">
                    <v-btn class="item" color="info" @click="submit">TEST</v-btn>
                    <v-btn class="item" color="primary" @click="save(); $vuetify.goTo('#detailpageinfo', {offset: -70});" :loading="isSaving" >SAVE</v-btn>
                </v-layout>
                <OutputBox v-if="response.length > 0" class="input-text" :msg="response"/>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import OutputBox from './OutputBox.vue';
import InputDictTemplate from './InputDictTemplate.vue';

    export default {
        components: {
            OutputBox, InputDictTemplate
        },
        data() {
            return {
                url: "",
                template: [],
                response: [],
                isSerial: false,
                startNum: 0,
                endNum: 0,
                isSaving: false,
            }
        },
        watch: {
            startNum(newValue, oldValue ) {
                this.template = [];
                if (newValue > this.endNum) {
                    return;
                }
                for (var i = newValue; i < this.endNum; i++) {
                    this.template.push(i);
                }
            },
            endNum(newValue, oldValue) {
                this.template = [];
                if (this.startNum > newValue) {
                    return; 
                }
                for (var i = this.startNum; i < parseInt(newValue)+1; i++) {
                    this.template.push(i);
                }
            }
        },
        methods: {
            updateTemplate(newValue) {
                this.template = newValue;
            },
            submit() {
                this.response = [];
                var templateData = [];
                switch (typeof(this.template)) {
                    case "string":
                        templateData = this.template.split(',');
                        break;
                    case "object":
                        templateData = eval(this.template);
                        break;
                    default:
                        break;
                }

                if (templateData.length === 0) {
                    this.response.push(this.url);
                }

                templateData.forEach((element) => {
                    var target = element;
                    if (typeof(element) === "string") {
                        target = element.trim();
                    }
                    this.response.push(this.url.replace('{var}', target));
                })
            },
            save() {
                this.isSaving = true;
                this.$inputDict['pageUrls'] = this.response;
                
                setTimeout(() => {
                    this.isSaving = false;
                }, 1000)
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