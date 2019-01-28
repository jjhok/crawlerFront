<template>
    <div>
        <v-textarea
            :label="label"
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
            label: {
                type: String,
                default: "Input Dictionary"
            },
            defaultTemplate: {
                type: String | Array,
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