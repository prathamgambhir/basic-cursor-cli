document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let resetDisplay = false;

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clear() {
        currentInput = '';
        operator = null;
        previousInput = '';
        resetDisplay = false;
        updateDisplay('0');
    }

    function handleNumber(number) {
        if (resetDisplay) {
            currentInput = number;
            resetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay(currentInput);
    }

    function handleOperator(nextOperator) {
        if (currentInput === '') return;

        if (previousInput !== '' && operator !== null && !resetDisplay) {
            calculate();
        }

        operator = nextOperator;
        previousInput = currentInput;
        currentInput = '';
        resetDisplay = true;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        resetDisplay = true;
        updateDisplay(currentInput);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                clear();
            }
        });
    });

    clear(); // Initialize display
});