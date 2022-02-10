const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandDisplay = document.querySelector('[data-previous-operand]')
const currentOperandDisplay = document.querySelector('[data-current-operand]')


class Calculator {
    constructor (previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        /*initial value*/
        this.clear()
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0,-1);
    }
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand ==='') return
        if (this.currentOperand === '' && this.previousOperand !==''){
            this.operation = operation
        } else if (this.previousOperand !== '' && this.currentOperand !=='') {
            this.compute()
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand=''
        } else {
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand=''
        }
        
        
    }
    compute() {
        if (isNaN(parseFloat(this.currentOperand)) || isNaN(parseFloat(this.previousOperand))) return
        switch(this.operation) {
            case '*':
                this.currentOperand = parseFloat(this.previousOperand) * parseFloat(this.currentOperand);
                break
            case '÷':
                this.currentOperand = parseFloat(this.previousOperand) / parseFloat(this.currentOperand);
                break
            case '+':
                this.currentOperand = parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
                break
            case '-':
                this.currentOperand = parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
                break
            default:
                return
        }
        this.operation = undefined
        this.previousOperand =''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
        }
        if(decimalDigits !=null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperandDisplay.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandDisplay.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandDisplay.textContent = ''
        }
    }
}

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})