function operacao() {
    const a = Number(document.getElementById('operand-1').value);
    const b = Number(document.getElementById('operand-2').value);
    const operator = document.getElementById('operator').value;

    let c;

    if (operator === 'add') {
        c = a + b;
    }
    if (operator === 'sub') {
        c = a - b;
    }
    if (operator === 'mult') {
        c = a * b;
    }
    if (operator === 'div') {
        c = a / b;
    }
    
    document.getElementById('result').innerHTML = c;
    console.log(c);
}