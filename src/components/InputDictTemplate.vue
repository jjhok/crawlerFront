<template>
    <div>
        <v-textarea
            label="Config"
            :value="defaultTemplate"
            rows="8"
            auto-grow
            box
            @input="updateTemplate"
        ></v-textarea>
    </div>
</template>

<script>
    export default {
        props: {
            defaultTemplate: {
                type: String,
                default: ""
            },
        },
        data() {
            return {
                template: ""
            }
        },
        methods: {
            updateTemplate(newValue) {
                this.$emit('update', newValue);
            }
        },
    }
</script>

<style scoped>

</style>