<script lang="ts">
import AnswerBox from './Components/AnswerBox.vue';
import Button from './Components/Button.vue';

import { calculator } from './calculator';

export default {
    name: 'Calculator',
    components: { AnswerBox, Button },
    setup() {
        const {
            addChar,
            clearCalculation,
            calculate,
            calculateSci,
            calculation,
            deleteLastChar,
        } = calculator();
        return {
            addChar,
            clearCalculation,
            calculate,
            calculateSci,
            calculation,
            deleteLastChar,
        };
    },
};
</script>

<template>
    <div
        id="container"
        class="bg-gray-600 rounded-2xl flex flex-col items-center justify-center gap-4 p-6 max-w-5xl max-h-[42rem] w-full h-full"
    >
        <AnswerBox :answerText="calculation" />

        <div
            id="button-container"
            class="min-w-full min-h-[85%] grid grid-rows-4 grid-cols-7 gap-2 p-2"
        >
            <!-- DELETE BUTTON COL 1 ROWS 1-2 -->
            <Button class="row-span-2" @click="deleteLastChar()">Del</Button>

            <!-- ROW 1 COLS 2-7 -->
            <Button @click="addChar('(')">(</Button>
            <Button @click="addChar(')')">)</Button>
            <Button
                v-for="number in [7, 8, 9]"
                :key="number"
                @click="addChar(number)"
                >{{ number }}</Button
            >
            <Button @click="addChar('/')">/</Button>

            <!-- ROW 2 COLS 2-7 -->
            <Button @click="calculateSci('sin')">Sin</Button>
            <Button @click="calculateSci('pi')">π</Button>
            <Button
                v-for="number in [4, 5, 6]"
                :key="number"
                @click="addChar(number)"
                >{{ number }}</Button
            >
            <Button @click="addChar('*')">*</Button>

            <!-- CLEAR BUTTON COL 1 ROW 3-4 -->
            <Button class="row-span-2" @click="clearCalculation()">Clr</Button>

            <!-- ROW 3 COL 2-7 -->
            <Button @click="calculateSci('cos')">Cos</Button>
            <Button @click="calculateSci('sq')">x²</Button>
            <Button
                v-for="number in [1, 2, 3]"
                :key="number"
                @click="addChar(number)"
                >{{ number }}</Button
            >
            <Button @click="addChar('-')">-</Button>

            <!-- ROW 4 COL 2-7 -->
            <Button @click="calculateSci('tan')">Tan</Button>
            <Button @click="calculateSci('sqrt')">√</Button>
            <Button @click="addChar('0')">0</Button>
            <Button @click="addChar('.')">.</Button>
            <Button @click="calculate()">=</Button>
            <Button @click="addChar('+')">+</Button>
        </div>
    </div>
</template>

<style></style>
