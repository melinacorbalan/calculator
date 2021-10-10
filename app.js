class CALCULATOR {
    constructor(previousOpText, currentOpText) {
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.clear();
    }


    clear() {
        this.currentOp = '';
        this.previousOp = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString();

    }

    selectOperation(operation) {
        if (this.currentOp === '') return
        if (this.previousOp != '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOp = this.currentOp;
        this.currentOp = ''
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOp);
        const current = parseFloat(this.currentOp);
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "*":
                computation = previous * current;
                break;
            case "÷":
                computation = previous / current;
                break;
            default:
                return;
        }

        this.currentOp = computation;
        this.operation = undefined;
        this.previousOp = '';

    }

    updateDisplay() {
        this.currentOpText.textContent = this.currentOp;
        if (this.operation != null) {
            this.previousOpText.textContent = `${this.previousOp} ${this.operation}`;
        } else {
            this.previousOpText.textContent = ''
        }

    }
}


const previousOpText = document.querySelector('.previous-op');
const currentOpText = document.querySelector('.current-op');
const ACButton = document.querySelector('#all-clear');
const deleteButton = document.querySelector('.delete');
const operationButtons = document.querySelectorAll('.operation');
const numberButtons = document.querySelectorAll('.number');
const equalsButton = document.querySelector('#equals');


const calculator = new CALCULATOR(previousOpText, currentOpText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.textContent);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.textContent);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

ACButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})