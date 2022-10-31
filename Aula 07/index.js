function logUser() {
    console.log(createUser());
}

function createUser() {
    const playerName = document.querySelector("#playerName").value;
    const day = Number(document.querySelector("#day").value);
    const month = Number(document.querySelector("#month").value) - 1;
    const year = Number(document.querySelector("#year").value);
    const weight = document.querySelector("#playerWeight").value;
    const height = document.querySelector("#playerHeight").value;
    const gender = document.querySelector("#gender").value;

    const user = new Object();
    user.name = playerName;
    user.birthDate = new Date(Date.UTC(year, month, day) + 86400000);
    user.weight = parseFloat(weight.replace(',','.'));
    user.height = parseInt(height, 10);
    user.gender = gender;

    return validateUser(user, year, month, day);
}

function validateUser(user, year, month, day) {
    let flag = false;
    if (!validateDateInput(year, month, day)) {
        document.querySelector('#date-error').style.visibility = 'visible';
        flag = true;
    } else {
        document.querySelector('#date-error').style.visibility = 'hidden';
    }
    
    if (user.weight <= 0) {
        document.querySelector('#weight-error').style.visibility = 'visible';
        flag = true;
    } else {
        document.querySelector('#weight-error').style.visibility = 'hidden';
    }
    if (flag) {
        return 'Preencha os campos corretamente!'
    }
    else {
        return user;
    }
}

function validateDateInput(year, month, day) {
    const timestamp = new Date();
    const date = new Date(Date.UTC(year, month, day) + 86400000);
    if (date.getTime() - timestamp.getTime() > 0) {
        return false
    }
    if (month > 12 || month < 0 || day < 1) {
        return false
    } else {
        let maxDays;
        switch (month+1) {
            case 1: maxDays = 31; break
            case 2: maxDays = 28; break
            case 3: maxDays = 31; break
            case 4: maxDays = 30; break
            case 5: maxDays = 31; break
            case 6: maxDays = 30; break
            case 7: maxDays = 31; break
            case 8: maxDays = 31; break
            case 9: maxDays = 30; break
            case 10: maxDays = 31; break
            case 11: maxDays = 30; break
            case 12: maxDays = 31; break
        }
        if (year % 4 === 0 && month === 1) {
            maxDays = 29;
        }
        if (day > maxDays) {
            return false
        }
    }
    return true
}

document.querySelector("#playerHeight").addEventListener('input', (event)=>{
    event.target.value = event.target.value.replace(/[^0-9]/, "");
})

document.querySelector("#day").addEventListener('input', (event)=>{
    event.target.value = event.target.value.replace(/[^0-9]/, "");
})

document.querySelector("#month").addEventListener('input', (event)=>{
    event.target.value = event.target.value.replace(/[^0-9]/, "");
})

document.querySelector("#year").addEventListener('input', (event)=>{
    event.target.value = event.target.value.replace(/[^0-9]/, "");
})

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('change', ()=>{
        verifyButton();
    })
})

document.querySelector('select').addEventListener('change', ()=>{
    verifyButton();
});

function verifyButton() {
    if (verifyEmptyInputs()) {
        document.querySelector('#confirm').disabled = false;
    } else {
        document.querySelector('#confirm').disabled = true;
    }
}

function verifyEmptyInputs() {
    const data = document.querySelectorAll('input');
    let i = 0;
    const genderValue = document.querySelector("#gender").value;

    while (i < data.length) {
        if (data[i].value === '' || genderValue === '') {
            return false
        }
        i++;
    }
    return true
}