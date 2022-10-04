<script lang="ts">
export default {
    name: 'Button',
    props: {},
};
</script>

<template>
    <div
        class="flex items-center justify-center w-full h-full bg-gray-700 rounded-3xl hover:bg-gray-800 text-white leading-[0px] text-[2rem]"
    >
        <button class="w-full h-full"><slot></slot></button>
    </div>
</template>

<style></style>
