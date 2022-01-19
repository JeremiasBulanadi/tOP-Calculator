const buttons = document.querySelectorAll(".button");
const screen = document.querySelector("#screen");
screen.textContent = '0';

let expression = "0";
let num1 = '';
let num2 = '';
let operation = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(e.target.id);
        handleButtonClick(e.target.id)
    })
});

const handleButtonClick = function (buttonId) {
    switch(buttonId) {
        case 'plus':
        case 'minus':
        case 'multiply':    
        case 'divide':
            if (expression === "") {
                num1 = 0;
            }
            operation = buttonId;
            break;
        case 'clear':
            num1 = '';
            num2 = '';
            operation = '';
            result = '';
            expression = "0";
            break;
        case 'equals':
            let n1 = parseInt(num1 ?? 0);
            let n2 = parseInt(num2 ?? 0);
            result = operation === 'plus' ? n1 + n2 :
                    operation === 'minus' ? n1 - n2 :
                    operation === 'multiply' ? n1 * n2 :
                    operation === 'divide' ? n1 / n2 :
                    '';
            break;
        default:
            console.log("in default");

            if (operation === '') {
                num1 += buttonId;
            } else {
                num2 += buttonId;
            }

            expression += buttonId;
            break;
    }

    handleExpression();
    //  Best to show responsiveness when buttons are pressed
    displayOutput();
}

const handleExpression = function () {
    if (result === '' ) {
        expression = '';
        if (operation !== '' && num1 === '') {
            expression = "0";
        } else {
            expression += num1?.replace(/^0+/, '') ?? '' ;
        }
        expression += ` ${
            operation === 'plus' ? '+' :
            operation === 'minus' ? '-' :
            operation === 'multiply' ? '*' :
            operation === 'divide' ? '/' : ''
        } `
        expression += num2?.replace(/^0+/, '') ?? '';
    } else {
        expression = result;
        num1 = result.toString();
        operation = '';
        num2 = '';
        result = '';
    }
}

const displayOutput = function () {
    screen.textContent = expression;
}