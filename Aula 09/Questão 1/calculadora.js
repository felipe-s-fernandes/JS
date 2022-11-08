function calculate(operation) {
    const a = parseFloat(document.querySelector("#firstInput").value);
    const b = parseFloat(document.querySelector("#secondInput").value);
    let result;

    try {
        verifyInputs(a, b);
    } catch(error) {
        document.querySelector("#error-message").innerHTML = error;
        document.querySelector("#error-message").style.visibility = 'visible';
        return
    }

    try {
        switch (operation) {
            case '+': result = addition(a, b); break;
            case '-': result = subtraction(a, b); break;
            case 'x': result = multiplication(a, b); break;
            case '÷': result = division(a, b); break;
            case '^': result = exponentiation(a, b); break;
        }
        document.querySelector("#output").value = result;
        document.querySelector("#error-message").style.visibility = 'hidden';
    } catch (error) {
        document.querySelector("#error-message").innerHTML = error;
        document.querySelector("#error-message").style.visibility = 'visible';
    }
}

function verifyInputs(a, b) {
    if (isNaN(a) && isNaN(b)) {
        throw 'Insert valid values for the operation!'
    } else {
        if (isNaN(a)) {
            throw 'Insert a valid value for the first operand!'
        }
        if (isNaN(b)) {
            throw 'Insert a valid value for the second operand!'
        }
    }
}

function addition(a, b) {
    return a + b
}

function subtraction(a, b) {
    return a - b
}

function multiplication(a, b) {
    return a * b
}

function division(a, b) {
    if (b === 0) {
        throw 'Cannot divide by 0'
    }
    return a / b
}

function exponentiation(a, b) {
    if (a === 0 && b < 0) {
        throw 'Cannot raise zero to negative power'
    }
    if (a < 0 && !Number.isInteger(b)) {
        throw 'Cannot raise negative number to non-integer power'
    }
    return a ** b
}