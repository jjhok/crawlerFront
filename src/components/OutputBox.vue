<template>
    <div>
        <v-textarea
            label="OUTPUT"
            name="name"
            textarea
            readonly
            rows="15"
            outline
            :value="JSON.stringify(msg)"
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
        },
    }
</script>

<style scoped>

</style>