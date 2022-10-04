<script lang="ts">
export default {
    name: 'Button',
    props: {
        buttonStyle: { type: String, default: 'gray' },
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

        return { classes: styleClasses };
    },
};
</script>

<template>
    <button
        class="flex items-center justify-center rounded-3xl leading-[0px] text-[2rem] w-full h-full"
        :class="classes"
    >
        <slot></slot>
    </button>
</template>

<style></style>
