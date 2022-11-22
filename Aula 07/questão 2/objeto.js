//Crie um objeto sem atributos ‘{}’ e adicione um atributo “Um atributo com espaços” com valor numérico 1, e exiba no console, de duas formas: 
//Utilizando colchetes;
//Sem utilizar colchetes.

const objeto = {};
objeto["Um atributo com espaços"] = 1;

Object.defineProperties(objeto, {
    "Outro atributo com espaços": {
        value: 1,
        writable: true
    }
});

console.log(objeto);