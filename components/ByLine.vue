<template>

    <div class="flex items-center justify-between gap-x-4 p-3.5 lg:px-5 lg:py-3">
        <div class="flex items-center gap-x-1.5">
            <div class="text-sm text-gray-400">By</div>
            <a href="https://numbers.lk" title="Numbers.lk">
                <div class="w-32 text-gray-100 hover:text-gray-50">
                    <NumberslkLogo />
                </div>
            </a>
        </div>
        <div class="text-sm text-gray-400">
            <div class="text-sm text-gray-400">follow us on,</div>
            <a class="underline decoration-dotted underline-offset-4 hover:text-gray-400"
                href="https://twitter.com/numberslka" target="_blank">
                Twitter
            </a>
            &
            <a class="underline decoration-dotted underline-offset-4 hover:text-gray-400"
                href="https://facebook.com/numbers.lk" target="_blank">
                Facebook
            </a>
        </div>
    </div>

</template>
<script>

import NumberslkLogo from './NumberslkLogo.vue';

export default {
    name: "ByLine",
    components: {
        NumberslkLogo,
    }
}

</script>
<style scoped>

</style>