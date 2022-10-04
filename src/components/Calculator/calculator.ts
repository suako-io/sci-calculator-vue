import { ref, readonly } from 'vue';

export function calculator() {
    let onScreen = ref("");
    let onScreenCursorPos: number = 0;
    let codeString: string = "";
    let codeStringCursorPos: number = 0;
    let lastCharacterAdded: string = "";
    const operatorsArray: string[] = ['+', '-', '/', '*', '.'];
    let isCalculationComplete: boolean = false;

    function addSpecialChar(newChar: string, newCodeString: string, addBrackets: boolean = false) {
        if (addBrackets) {
            const screenSubString = `${newChar}()`;
            insertStringOnScreen(screenSubString);
            onScreenCursorPos += screenSubString.length - 1;
            
            const codeSubString = `${newCodeString}()`;
            insertStringIntoCodeString(codeSubString);
            codeStringCursorPos += codeSubString.length - 1;
        }
        else {
            insertStringOnScreen(newChar);
            onScreenCursorPos++;
    
            insertStringIntoCodeString(newCodeString);
            codeStringCursorPos += newCodeString.length;
        }
    }

    function insertStringOnScreen(stringToInsert: string){
        lastCharacterAdded = stringToInsert;
        const newString: string = onScreen.value.substring(0, onScreenCursorPos) + stringToInsert + onScreen.value.substring(onScreenCursorPos);
        onScreen.value = newString;
    }

    function insertStringIntoCodeString(stringToInsert: string){
        let leftSideOfString = codeString.substring(0, codeStringCursorPos);
        const rightSideOfString = codeString.substring(codeStringCursorPos);

        const lastCharOnLeftSide = leftSideOfString.split("").pop();

        if (lastCharOnLeftSide) {
            if (lastCharOnLeftSide?.match(/[a-zA-Z]/) || (!isNaN(parseFloat(lastCharOnLeftSide as string)) && stringToInsert.match(/[a-zA-Z]/))) {
                leftSideOfString += '*';
                codeStringCursorPos++
            }
        }

        const newString: string = leftSideOfString + stringToInsert + rightSideOfString;
        
        codeString = newString;
    }

    function addChar(newChar: string) {
        if (lastCharacterAdded === '.' && lastCharacterAdded === newChar) return;

        if (isCalculationComplete)
            clearCalculation();

        if (newChar != '.' && isNaN(parseFloat(newChar)) && !operatorsArray.includes(newChar)) {
            switch(newChar) {
                case ('pi'):
                    addSpecialChar('π', "Math.PI");
                    break;

                case ('sqrt'):
                    addSpecialChar('√', "Math.sqrt", true);
                    break;

                case ('sin'):
                    addSpecialChar('sin', "Math.sin", true);
                    break;
                
                case ('cos'):
                    addSpecialChar('cos', "Math.cos", true);
                    break;

                case ('tan'):
                    addSpecialChar('tan', "Math.tan", true);
                    break;

                case ('('):
                    insertStringOnScreen("(");
                    onScreenCursorPos++;
                    insertStringIntoCodeString("(")
                    codeStringCursorPos++;
                    break;
                
                case (')'):
                    insertStringOnScreen(")");
                    insertStringIntoCodeString(")")
                    break;
                    
                case ('pow'):
                    break;

                default: break;
            }
        }
        else {
            insertStringOnScreen(newChar);
            onScreenCursorPos++;

            insertStringIntoCodeString(newChar)
            codeStringCursorPos++;
        }
        
        // console.log(`On Screen: ${onScreen.value} | LEN: ${onScreen.value.length} | POS: ${onScreenCursorPos}`);
        // console.log(`Code String: ${codeString} | LEN: ${codeString.length} | POS: ${codeStringCursorPos}`);
    }

    function calculate() {
        if (!onScreen.value) return;
        let result: number;

        result = eval(codeString);       
        onScreen.value = result.toString();
        isCalculationComplete = true;
        // console.log(result);
    }

    function deleteLastChar(){
        if (!onScreen.value.length || isCalculationComplete) return;

        onScreen.value = onScreen.value.slice(0, -1);
        onScreenCursorPos--;

        codeString = codeString.slice(0, -1);
        codeStringCursorPos--;
    }

    function clearCalculation() {
        onScreen.value = "";
        onScreenCursorPos = 0;
        codeString = "";
        codeStringCursorPos = 0;
        isCalculationComplete = false;
    }

    return { 
        calculation: readonly(onScreen),
        addChar,
        calculate,
        deleteLastChar,
        clearCalculation,
    };
}