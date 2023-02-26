<template>
    <div class="py-5 px-6">
        <h5 class="text-sm font-semibold text-gray-300 mb-6 leading-normal tracking-wide">{{ title }}</h5>
        <div class="flex flex-wrap items-center mb-1 -m-2">
            <div class="w-auto p-2">
                <h4 class="text-2xl text-gray-100 font-bold tracking-wide">{{ value }}</h4>
            </div>
            <div class="w-auto p-2">
                <div
                    class="inline-flex px-2 h-7 items-center justify-center text-purple-500 bg-purple-900 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00002 3.33337V12.6667" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M10.6667 10L8.00002 12.6667" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M5.33334 10L8.00001 12.6667" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg><span class="text-xs font-medium">{{ presentageChange }}</span>
                </div>
            </div>
        </div>
        <p class="text-xs font-semibold text-gray-300">Last week 84,70K</p>
    </div>
</template>

<script>
export default {
    name: 'Table',
    components: {},
    props: {
        value: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }, presentageChange: {
            type: String,
            default: ""
        }
    },

    data() {
        return {

        }
    }
}
</script>
