<template>
    <div>
        <v-textarea
            label="Config - 따옴표 주의"
            :value="defaultTemplate"
            rows="8"
            auto-grow
            box
            counter
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