const output = document.querySelector("#output");

function logPerson() {

    const person = createPerson();
    output.textContent = JSON.stringify(person);
}

function createPerson() {
    const playerName = document.querySelector("#playerName").value;
    const age = document.querySelector("#playerAge").value;
    const gender = document.querySelector("#gender").value;

    const person = new Object();
    person.name = playerName;
    person.age = parseInt(age, 10);
    person.gender = gender;
    person.welcome = `Seja bem-vindo(a) ${person.name}, você tem ${person.age} anos de idade`

    return person
}