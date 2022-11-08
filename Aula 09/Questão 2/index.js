function daysToDeath() {
    const errorElement = document.querySelector("#error-message");
    let person;

    try {
        person = createPerson();
    } catch(error) {
        errorElement.innerHTML = error;
        errorElement.style.visibility = 'visible';
        return;
    }
    errorElement.style.visibility = 'hidden';
    if (person.daysToDeath() <=  0) {
        document.querySelector("#timeRemaining").innerHTML = 'Você já deveria ter morrido...';
    } else {
        document.querySelector("#timeRemaining").innerHTML = `Você possui ${person.daysToDeath()} dias de vida...`;    
    }
    document.querySelector(".death-count").style.filter = 'invert(1)';
}

function createPerson() {
    const day = Number(document.querySelector("#day").value);
    const month = Number(document.querySelector("#month").value) - 1;
    const year = Number(document.querySelector("#year").value);
    const gender = document.querySelector("#gender").value;

    if (!verifyDate(year, month, day)) {
        throw 'Invalid date!'
    }
    if (gender === '') {
        throw 'Select a gender!'
    }

    const person = {
        birthDate: new Date(year, month, day),
        gender: gender,
        daysToDeath: function() {
            const date = new Date();
            if (this.gender === 'male') {
                return Math.floor((73.1 - (date.getTime() - this.birthDate.getTime())/31536000000)*365);
            }
            if (this.gender === 'female') {
                return Math.floor((80.1 - (date.getTime() - this.birthDate.getTime())/31536000000)*365);
            }
            if (this.gender === 'non-binary' || this.gender === 'other') {
                return Math.floor((72.7 - (date.getTime() - this.birthDate.getTime())/31536000000)*365);
            }
        }
    }

    return person;  
}

function verifyDate(year, month, day) {
    const timestamp = new Date();
    const date = new Date(Date.UTC(year, month, day));
    if (date.getTime() > timestamp.getTime() || isNaN(date.getDay())) {
        return false;
    }
    if (month > 12 || month < 0 || day < 1) {
        return false;
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
            return false;
        }
    }
    return true;
}