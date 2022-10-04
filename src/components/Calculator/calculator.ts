import { BreakAfterProperty } from 'csstype';
import { ref, readonly } from 'vue';

export function calculator() {
    let calculation = ref("");
    let calculationCompleted = ref(false);

    function addChar(char: string) {
        const lastEntry = calculation.value[calculation.value.length - 1];

        if (lastEntry === "." && char === ".")
            return;

        if (calculationCompleted.value){
            clearCalculation();
            calculationCompleted.value = false;
        }


        calculation.value += char;
        console.log(calculation.value);
    }

    function calculate() {
        if (!calculation.value) return;
        
        const expression: string = calculation.value;
        let result: number;

        console.log(expression);

        for (var i = 0; i < expression.length; i++)
            if (isNaN(parseInt(expression[i])) && !['+', '-', '/', '*', '.'].includes(expression[i]))
                return; 

        result = eval(expression);       
        calculation.value = result.toString();
        console.log(result);
    }

    function calculateSci(mathFunc: string){
        if (!calculation.value) return;
        const value: number = parseFloat(calculation.value);
        let result: number;

        switch (mathFunc){
            case ('pi'):
                result = Math.PI * value;
                calculation.value = result.toString();
                break;
            
            case ('sq'):
                result = value * value;
                calculation.value = result.toString();
                break;

            case ('sqrt'):
                result = Math.sqrt(value);
                calculation.value = result.toString();
                break;

            case ('sin'):
                result = Math.sin(value);
                calculation.value = result.toString();
                break;

            case ('cos'):
                result = Math.cos(value);
                calculation.value = result.toString();
                break;

            case ('tan'):
                result = Math.tan(value);
                calculation.value = result.toString();
                break;

            default: break;
        }
    }

    function deleteLastChar(){
        if (!calculation.value.length) return;

        calculation.value = calculation.value.slice(0, -1);
    }

    function clearCalculation() {
        calculation.value = "";
    }

    return { 
        calculation: readonly(calculation),
        addChar,
        calculate,
        calculateSci,
        deleteLastChar,
        clearCalculation,
    };
}