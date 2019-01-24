<template>
    <div>
        <v-textarea
            label="Input object"
            :value="template"
            rows="10"
            auto-grow
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
        watch: {
            defaultTemplate(newValue, oldValue) {
                this.template = newValue;
            }
        },
        data() {
            return {
                template: ""
            }
        },
        methods: {
            updateTemplate() {
                this.$emit('update', this.template);
            }
        },
    }
</script>

<style scoped>

</style>