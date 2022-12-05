import TypeCep from "./modules/TypeCep.js"

const cep = document.querySelector("#cep");
const consultButton = document.querySelector("#consult");
const locationInfo = document.querySelector(".location-info");
const map = document.querySelector(".map");

let mapButton;

cep.addEventListener('input', (event) => TypeCep(event, cep));
consultButton.addEventListener('click', () => {
    writeAddressData()
});

function buttonState(button, state) {
    if (state === 'disable') {
        button.disabled = true;
        button.style.cursor = 'wait';
    } else if (state === 'enable') {
        button.disabled = false;
        button.style.cursor = 'pointer';
    };
};

function writeAddressData() {
    buttonState(consultButton, 'disable');
    fetch(urlCep(cep.value))
    .then((response) => {
        if (response.ok) {
            return response.json();
        };
        throw 'CEP inválido!';
    })
    .then ((json) => {
        console.log(json)
        createLocationInfo(json);
        buttonState(consultButton, 'enable');
    })
    .catch((error) => {
        eraseInfo(error);
        buttonState(consultButton, 'enable');
    });
};

function eraseInfo(error) {
    locationInfo.innerHTML = "";
    locationInfo.style.visibility = 'visible';
    map.innerHTML = "";
    map.style.visibility = 'hidden';
    const errorMessage = document.createElement("p");
    errorMessage.classList.add('error-message');
    errorMessage.innerText = error;
    errorMessage.style.color = 'red';
    locationInfo.appendChild(errorMessage);
};

function createLocationInfo(json) {
    locationInfo.innerHTML = "";
    locationInfo.style.visibility = 'visible';
    const keys = ['address', 'district', 'city', 'state', 'lat', 'lng'];
    keys.forEach((key) => {
        locationInfo.appendChild(
            resultWithTitle(key, json[key])
            
        );
    });
    map.style.visibility = 'hidden';
    createMapButton()
};

function createMapButton() {
    mapButton = document.createElement("button");
    mapButton.classList.add("botao");
    mapButton.innerText = 'Exibir mapa';
    mapButton.onclick = showMap;
    locationInfo.appendChild(mapButton);
}

function resultWithTitle(key, result) {
    const title = titleName(key);
    const label = document.createElement("label");
    const input = document.createElement("input");
    const div = document.createElement("div");

    label.innerText = title;
    input.value = result;
    input.id = key;
    input.disabled = true;
    div.appendChild(label);
    div.appendChild(input);
    div.classList.add("input-box");
    return div;
};

function titleName(key) {
    switch(key) {
        case 'cep': return 'CEP:';
        case 'address': return 'Endereço:'
        case 'address_type': return 'Tipo:'
        case 'address_name': return 'Logradouro:'
        case 'state': return 'Estado:';
        case 'district': return 'Bairro:';
        case 'lat': return 'Latitude:'
        case 'lng': return 'Longitude:'
        case 'city': return 'Cidade:';
        case 'city_ibge': return 'Código IBGE:';
        case 'ddd': return 'DDD:';
    };
};

function showMap() {
    map.innerHTML = "";
    map.style.visibility = 'visible';
    const lat = document.querySelector("#lat").value;
    const lng = document.querySelector("#lng").value;
    const iframe = document.createElement("iframe");
    iframe.src = urlMap(lat, lng);
    map.appendChild(iframe);
};

function urlMap(latitude, longitude) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&hl=pt&z=14&output=embed`;
}

function urlCep(cep) {
    return `https://cep.awesomeapi.com.br/json/${cep.replace("-","")}`;
};