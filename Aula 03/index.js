function operacao() {
    const a = Number(document.getElementById('operand-1').value);
    const b = Number(document.getElementById('operand-2').value);

    const operator = document.getElementById('operator').value;
    let result = document.getElementById('result');

    if (operator === 'add') {
        result.innerHTML = a + b;
    }
    if (operator === 'sub') {
        result.innerHTML = a - b;
    }
    if (operator === 'mult') {
        result.innerHTML = a * b;
    }
    if (operator === 'div') {
        result.innerHTML = a / b;
    }
}