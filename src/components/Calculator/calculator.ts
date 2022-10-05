import { ref, readonly } from 'vue';
import { create, all } from 'mathjs';

export const inverted = ref(false);

export function calculator() {
    const math = create(all, {});

    let onScreen = ref('');
    let onScreenCursorPos: number = 0;
    let lastCharacterAdded: string = '';

    const operatorsArray: string[] = ['+', '-', '/', '*', '.'];
    let isCalculationComplete: boolean = false;

    function insertIntoOnScreen(stringToInsert: string) {
        lastCharacterAdded = stringToInsert;
        const newString: string =
            onScreen.value.substring(0, onScreenCursorPos) +
            stringToInsert +
            onScreen.value.substring(onScreenCursorPos);
        onScreen.value = newString;
    }

    function addToScreen(newChar: string, addBrackets: boolean = false, canBeFirstChar: boolean = true) {
        if (lastCharacterAdded === '' && !canBeFirstChar) return;

        if (addBrackets) {
            const screenSubString = `${newChar}()`;
            insertIntoOnScreen(screenSubString);
            onScreenCursorPos += screenSubString.length - 1;
        } else {
            insertIntoOnScreen(newChar);
            onScreenCursorPos++;
        }

        lastCharacterAdded = newChar;
    }

    function addChar(newChar: string) {
        if (lastCharacterAdded === '.' && lastCharacterAdded === newChar) return;
        if (onScreen.value.length >= 36) return;
        if (isCalculationComplete) clearCalculation();

        if (newChar != '.' && isNaN(parseFloat(newChar)) && !operatorsArray.includes(newChar)) {
            switch (newChar) {
                case 'pi':
                    addToScreen('π');
                    break;

                case 'sqrt':
                    addToScreen('√', true);
                    break;

                case 'sin':
                    if (inverted.value) addToScreen('asin', true);
                    else addToScreen('sin', true);
                    break;

                case 'cos':
                    if (inverted.value) addToScreen('acos', true);
                    else addToScreen('cos', true);
                    break;

                case 'tan':
                    if (inverted.value) addToScreen('atan', true);
                    else addToScreen('tan', true);
                    break;

                case '(':
                    addToScreen('(');
                    break;

                case ')':
                    addToScreen(')');
                    break;

                case 'pow':
                    addToScreen('^', false, false);
                    break;

                case '!':
                    addToScreen('!', false, false);
                    break;

                case 'e':
                    addToScreen('e');
                    break;

                default:
                    break;
            }
        } else addToScreen(newChar);

        // console.log(`On Screen: ${onScreen.value} | LEN: ${onScreen.value.length} | POS: ${onScreenCursorPos}`);
    }

    function calculate() {
        if (!onScreen.value) return;
        let mathExpression: string = onScreen.value;

        for (let i = 0; i < mathExpression.length; i++) {
            let currentChar = mathExpression[i];

            switch (currentChar) {
                case 'π':
                    mathExpression = mathExpression.replace('π', 'pi');
                    break;

                case '√':
                    mathExpression = mathExpression.replace('√', 'sqrt');
                    break;

                default:
                    break;
            }
        }

        let result: number;
        result = math.evaluate(mathExpression);

        onScreen.value = result.toString();
        isCalculationComplete = true;
    }

    function deleteLastChar() {
        if (!onScreen.value.length || isCalculationComplete) return;

        onScreen.value = onScreen.value.slice(0, -1);
        onScreenCursorPos--;
    }

    function clearCalculation() {
        onScreen.value = '';
        onScreenCursorPos = 0;
        isCalculationComplete = false;
        lastCharacterAdded = '';
    }

    return {
        calculation: readonly(onScreen),
        addChar,
        calculate,
        deleteLastChar,
        clearCalculation,
    };
}
