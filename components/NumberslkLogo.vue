<template>
    <div>
        <img height="120" src="./../assets/logo-long.png"/>
    </div>
</template>

<script>
export default {
    name: 'NumberslkLogo',
    components: {},
    props: {
        value: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: ""
        }
    },

    data() { }
}
</script>
