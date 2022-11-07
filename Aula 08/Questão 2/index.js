function createObject(){
    return JSON.parse(document.querySelector("#jsonText").value);
}

function logObject() {
    try {
        createObject();
        document.querySelector("#errorMessage").innerHTML = 'Parsable JSON string!';
        document.querySelector("#errorMessage").style.color = 'green';
        console.log(createObject());
    } catch (error) {
        console.error(error);
        document.querySelector("#errorMessage").innerHTML = error;
        document.querySelector("#errorMessage").style.color = 'red';
        return
    }

}