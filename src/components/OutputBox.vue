<template>
    <div>
        <v-textarea
            label="OUTPUT"
            name="name"
            textarea
            readonly
            :rows="rows"
            :loading="loading"
            outline
            :value="JSON.stringify(msg, null, 4)"
        ></v-textarea>
    </div>
</template>

<script>
    export default {
        props: {
            msg: {
                type: Object | String | Array,
                default: ""
            },
            rows: {
                type: String,
                default: "15"
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
    }
</script>

<style scoped>

</style>