<template>
    <div>
        <v-textarea
            label="OUTPUT"
            name="name"
            textarea
            readonly
            rows="15"
            box
            :value="JSON.stringify(msg)"
        ></v-textarea>
    </div>
</template>

<script>
    export default {
        props: {
            msg: {
                type: Object,
                default: ""
            },
        },
    }
</script>

<style scoped>

</style>