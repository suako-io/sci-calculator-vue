<script lang="ts">
import { inverted } from '../calculator';

export default {
    name: 'Button',
    props: {
        buttonText: { type: String },
        altText: { type: String },
        canInvert: { type: Boolean, default: false },
        buttonStyle: { type: String, default: 'gray' },
        isToggle: { type: Boolean, default: false },
    },
    setup(props: any) {
        let styleClasses: string = '';

        switch (props.buttonStyle) {
            case 'gray':
                styleClasses = 'bg-gray-600 hover:bg-gray-700 text-white';
                break;

            case 'number':
                styleClasses = 'bg-gray-300 hover:bg-gray-400 text-gray-900';
                break;

            case 'red':
                styleClasses = 'bg-red-700 hover:bg-red-800 text-white';
                break;

            case 'yellow':
                styleClasses = 'bg-yellow-600 hover:bg-yellow-700 text-white';
                break;

            case 'blue':
                styleClasses = 'bg-blue-800 hover:bg-blue-900 text-white';
                break;

            case 'green':
                styleClasses = 'bg-green-700 hover:bg-green-800 text-white';
                break;

            case 'disabled':
                styleClasses = 'bg-gray-900 text-gray-400';
                break;

            default:
                break;
        }

        return { classes: styleClasses, inverted };
    },
};
</script>

<template>
    <button
        class="flex items-center justify-center rounded-3xl leading-[0px] text-[2rem] w-full h-full"
        :class="[classes, { 'bg-red-700 hover:bg-red-800 text-white': inverted && isToggle }]"
    >
        <div v-if="!canInvert || (canInvert && !inverted)">{{ buttonText }}</div>
        <div v-if="canInvert && inverted">{{ altText }}</div>
    </button>
</template>

<style></style>
