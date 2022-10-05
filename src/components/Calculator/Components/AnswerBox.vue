<script lang="ts">
export default {
    name: 'answer-box',
    props: {
        answerText: String,
    },
};
</script>

<template>
    <div
        id="answer-box"
        class="min-w-full min-h-[15%] bg-gray-400 flex justify-end items-center rounded-2xl leading-[0px] text-[3rem] text-black"
    >
        <div class="text-right pr-6">
            {{ answerText }}
        </div>
    </div>
</template>

<style></style>
