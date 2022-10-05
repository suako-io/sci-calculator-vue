<script lang="ts">
import AnswerBox from './Components/AnswerBox.vue';
import Button from './Components/Button.vue';

import { calculator, inverted } from './calculator';

export default {
    name: 'Calculator',
    components: { AnswerBox, Button },
    setup() {
        const { addChar, clearCalculation, calculate, calculation, deleteLastChar } = calculator();
        return { addChar, clearCalculation, calculate, calculation, deleteLastChar, inverted };
    },
};
</script>

<template>
    <div
        id="container"
        class="bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-4 p-6 max-w-6xl max-h-[42rem] w-full h-full"
    >
        <AnswerBox :answerText="calculation" />

        <div id="button-container" class="min-w-full min-h-[85%] grid grid-rows-4 grid-cols-8 gap-2 p-2">
            <!-- COL(1-8) ROW(1) -->

            <!-- DEL | COL(1-2) ROW(1) -->
            <Button class="row-span-2" buttonText="Del" buttonStyle="yellow" @click="deleteLastChar()" />

            <Button buttonText="Inv" :isToggle="true" @click="inverted = !inverted" />
            <Button buttonText="(" @click="addChar('(')" />
            <Button buttonText=")" @click="addChar(')')" />
            <Button
                buttonStyle="number"
                v-for="number in [7, 8, 9]"
                :key="number"
                :buttonText="number.toString()"
                @click="addChar(number)"
            />
            <Button buttonText="/" buttonStyle="blue" @click="addChar('/')" />

            <!-- COL(1-8) ROW(2) -->
            <Button buttonText="RAD" buttonStyle="disabled" />
            <Button buttonText="Sin" altText="Sin⁻¹" :canInvert="true" @click="addChar('sin')" />
            <Button buttonText="π" @click="addChar('pi')" />
            <Button
                buttonStyle="number"
                v-for="number in [4, 5, 6]"
                :key="number"
                @click="addChar(number)"
                :buttonText="number.toString()"
                >{{ number }}</Button
            >
            <Button buttonText="*" buttonStyle="blue" @click="addChar('*')" />

            <!-- CLEAR BUTTON COL(1) ROW(3-4) -->
            <Button buttonText="Clr" buttonStyle="red" class="row-span-2" @click="clearCalculation()" />

            <!-- COL(2-8) ROW(3) -->
            <Button buttonText="xʸ" @click="addChar('pow')" />
            <Button buttonText="Cos" altText="Cos⁻¹" :canInvert="true" @click="addChar('cos')" />
            <Button buttonText="e" @click="addChar('e')" />
            <Button
                buttonStyle="number"
                v-for="number in [1, 2, 3]"
                :key="number"
                @click="addChar(number)"
                :buttonText="number.toString()"
                >{{ number }}</Button
            >
            <Button buttonText="-" buttonStyle="blue" @click="addChar('-')" />

            <!-- COL(2-8) ROW(4) -->
            <Button buttonText="√" @click="addChar('sqrt')" />
            <Button buttonText="Tan" altText="Tan⁻¹" :canInvert="true" @click="addChar('tan')" />
            <Button buttonText="x!" @click="addChar('!')" />
            <Button buttonText="0" buttonStyle="number" @click="addChar(0)" />
            <Button buttonText="." buttonStyle="number" @click="addChar('.')" />
            <Button buttonText="=" buttonStyle="green" @click="calculate()" />
            <Button buttonText="+" buttonStyle="blue" @click="addChar('+')" />
        </div>
    </div>
</template>
