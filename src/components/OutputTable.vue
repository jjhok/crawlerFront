<template>
    <div id="outputtable">
        <v-data-table
            :headers="headers"
            :items="response"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td v-for="header in headers" :key="header.id">
                    {{ props.item[header.text] }}
                </td>
            </template>
        </v-data-table>
        <!-- <table class="table table-bordered">
            <thead>
                <tr>
                    <th v-for="index in indexes">{{index}}</th>
                </tr>
            </thead>
            <tr v-for="item in response">
                <td v-for="element in item">{{element}}</td>
            </tr>
        </table>
        <v-btn color="error" @click="getKey">get KEY</v-btn> -->
</div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.response);
        },
        props: {
            response: {
                type: Array,
                default: {}
            },
        },
        computed: {
            headers() {
                var headers = new Array();
                for (var key in this.response[0]) {
                    headers.push({text: key, value: key});
                }
                return headers;
            }
        },
        methods: {
            getKey() {
                console.log(this.indexes);
            }
        },
    }
</script>

<style scoped>

</style>