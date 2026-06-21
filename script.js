const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-buttons button');

let currentInput = '';
let shouldReset = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            if (currentInput === '') return;
            try {
                const result = Function('"use strict"; return (' + currentInput + ')')();
                display.value = parseFloat(result.toFixed(10));
                currentInput = String(parseFloat(result.toFixed(10)));
                shouldReset = true;
            } catch {
                display.value = 'Error';
                currentInput = '';
            }

        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '') return;
            // Replace last operator if input ends with one
            if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
                currentInput = currentInput.slice(0, -1);
            }
            currentInput += value;
            display.value = currentInput;
            shouldReset = false;

            } else if (value === '⌫') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput || '0';
}

        else {
            // Number or '00'
            if (shouldReset) {
                currentInput = '';
                shouldReset = false;
            }
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ('0123456789'.includes(key) || ['+', '-', '*', '/'].includes(key)) {
        document.querySelector(`.calculator-buttons button:not([data-ignore])`);
        // Find and click matching button
        buttons.forEach(btn => {
            if (btn.textContent === key) btn.click();
        });
    } else if (key === 'Enter' || key === '=') {
        buttons.forEach(btn => { if (btn.textContent === '=') btn.click(); });
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    } else if (key === 'Escape') {
        currentInput = '';
        display.value = '0';
        shouldReset = false;
    }
});