const calculator = { 
    displayValue : '0',
    firstOperand : null,
    waitingForSecondOperand : false,
    operator : null,
};

function inputDigit(digit){
    const { displayValue, waitingForSecondOperand } = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true){
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
    return
    }

    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}
        function handleOperator(nextOperator){
            const { firstOperand, displayValue, operator} = calculator
            const inputValue = parseFloat(displayValue);

            if (operator && calculator.waitingForSecondOperand) {
                calculator.operator = nextOperator;
                return;
            }
            if (firstOperand == null && !isNaN(inputValue)){
                calculator.firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
                calculator.firstOperand = result;
            }
            calculator.waitingForSecondOperand = true;
            calculator.operator = nextOperator;
        }

        function calculate(firstOperand, SecondOperand, operator){
            if (operator === '+'){
                return firstOperand + SecondOperand;
            } else if (operator === '-'){
                return firstOperand - SecondOperand
            } else if (operator === '*'){
                return firstOperand * SecondOperand
            } else if (operator === '/'){
                return firstOperand / SecondOperand
            } else if (operator === 'cos') {
                return Math.cos(SecondOperand)
            } else if (operator === 'sin') {
                return Math.sin(SecondOperand)
            }  else if (operator === 'tan') {
                return Math.tan(SecondOperand)
            } else if (operator === 'log') {
                return Math.log(10)(SecondOperand)
            } return firstOperand;
        }

        function resetcalculator(){
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        }

        function updateDisplay() {
            const display = document.querySelector('.calculator-screen');
            display.value = calculator.displayValue;
        }

        updateDisplay();
        const keys = document.querySelector('.calculator-keys');
        keys.addEventListener('click', event => {
            const { target } = event;
            const { value } = target;
            if (!target.matches('button')) {
                return;
            }
            switch (value){
                case '+':
                case '-':
                case '*':
                case '/':
                case 'cos':
                case 'sin':
                case 'tan':
                case '=' :
            handleOperator(value);
            break;
            case '.':
            inputDecimal(value);
            break;
            case 'all-clear':
            resetcalculator();
            break;
            default:
            if (Number.isInteger(parseFloat(value))){
                inputDigit(value);
            }
            }
            updateDisplay();
        });
