function logUser() {
    try {
        createUser();
    } catch (error) {
        console.error(error);
        return
    }
    const user = createUser();
    document.querySelector('#nameResult').value = user.name;
    document.querySelector('#birthDateResult').value = `${user.birthDate.getDate()}/${user.birthDate.getMonth() + 1}/${user.birthDate.getFullYear()}`;
    document.querySelector('#weightResult').value = user.weight;
    document.querySelector('#heightResult').value = user.height;
    document.querySelector('#genderResult').value = user.gender;
    document.querySelector('#stringJSON').textContent = JSON.stringify(user);
    console.log(user);
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
    user.weight = parseFloat(weight);
    user.height = parseInt(height, 10);
    user.gender = gender;

    try {
        validateInput(user, year, month, day);
    } catch(error) {
        document.querySelector('#errorMessage').innerHTML = error;
        throw 'Execution Stopped'
    }

    return user
}

function validateInput(user, year, month, day) {
    if (user.name === '' || user.name.length < 5) {
        throw 'Field "name" is invalid!'
    }

    validateDateInput(year, month, day);

    if (isNaN(user.weight) || user.weight <= 0) {
        throw 'Field "weight" is invalid!'
    }
    if (isNaN(user.height) || !Number.isInteger(user.height) || user.height <= 0) {
        throw 'Field "height" is invalid!'
    }
    if (user.gender === '') {
        throw 'Field "gender" is invalid!'
    }
    document.querySelector('#errorMessage').innerHTML = '';
}

function validateDateInput(year, month, day) {
    const timestamp = new Date();
    const date = new Date(Date.UTC(year, month, day) + 86400000);
    if (date.getTime() - timestamp.getTime() > 0 || isNaN(date.getDay())) {
        throw 'Field "birthDate" is invalid!'
    }
    if (month > 12 || month < 0 || day < 1) {
        throw 'Field "birthDate" is invalid!'
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
            throw 'Field "birthDate" is invalid!'
        }
    }
}