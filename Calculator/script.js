let input = document.getElementById('input');
let result = document.getElementById('result');
let lastAnswer = 0;

function appendValue(value) {
    input.innerText += value;
}

function deleteLast() {
    input.innerText = input.innerText.slice(0, -1);
}

function clearDisplay() {
    input.innerText = '';
    result.innerText = '';
}

function calculate() {
    try {
        let expression = input.innerText.replace(/√/g, 'Math.sqrt');
        lastAnswer = eval(expression);
        result.innerText = lastAnswer;
    } catch {
        result.innerText = 'Error';
    }
}

function getAnswer() {
    input.innerText += lastAnswer;
}

function toggleSign() {
    if (input.innerText) {
        input.innerText = -parseFloat(input.innerText).toString();
    }
}
