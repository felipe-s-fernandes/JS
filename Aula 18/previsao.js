const selects = document.querySelector(".selects");
const stateSelect = document.querySelector("#states");
const districtsDiv = document.querySelector(".districts")
const body = document.querySelector("body");

requestFunction('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
.then((states) => {
    states.forEach((state) =>{
        const option = document.createElement("option");
        option.value = state.sigla;
        option.innerText = state.nome;
        stateSelect.appendChild(option);
    })
});

stateSelect.addEventListener('change', ()=> {
    fetchDistricts();
});

function fetchDistricts (){
    const url = (`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSelect.value}/distritos?orderBy=nome`)
    requestFunction(url)
    .then((districts) => {
        createDistricts(districts);
    })
    .catch((error) => console.log(error));
};

function createDistricts(districts) {
    districtsDiv.innerHTML = '';

    const districtLabel = document.createElement("label");
    const districtSelect = document.createElement("select");
    const defaultOption = document.createElement("option");

    districtLabel.innerText = 'Cidade';
    districtsDiv.appendChild(districtLabel);
    
    defaultOption.value = 'default';
    defaultOption.innerText = '- Selecione uma cidade -'
    defaultOption.selected = true;
    defaultOption.disabled = true;
    districtSelect.appendChild(defaultOption);

    districts.forEach((district) => {
        const option = document.createElement("option");
        option.value = district.municipio.id;
        option.innerText = district.nome;
        districtSelect.appendChild(option);
    });
    
    districtsDiv.appendChild(districtSelect);
    districtsDiv.classList.add("input-box")
    districtSelect.addEventListener('change', () => {
        forecast(districtSelect.value);
    });
};

function forecast(district) {
    const url = (`https://apiprevmet3.inmet.gov.br/previsao/${district}`);

    requestFunction(url)
    .then((json) => {
        //Removendo innerHTML da previsão caso já tenha sido realizada uma vez 
        const test = document.querySelector("#forecastDiv")
        if (test !== null) {
            test.remove();
        };
        const forecastDiv = forecastHTML(json[district]);
        body.appendChild(forecastDiv);
    })
};

function forecastHTML(weather) {
    const dates = Object.keys(weather)
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("wrapper");
    forecastDiv.id = "forecastDiv";

    let i = 0;
    let object;
    dates.forEach((date) => {
        if (i < 2) {
            object = weather[date].manha;
            i++;
        } else {object = weather[date]};
        
        const day = document.createElement("p");
        day.innerText = `${date} - ${object.dia_semana}`

        const figure = document.createElement("figure");
        const icon = document.createElement("img");
        icon.src = object.icone;
        figure.appendChild(icon);

        const resumo = document.createElement("p");
        resumo.innerText = object.resumo;
        
        const min = document.createElement("p");
        min.innerText = `Mínima: ${object.temp_min}°C`
        const max = document.createElement("p");
        max.innerText = `Mínima: ${object.temp_max}°C`
        
        const weatherReport = document.createElement("div");
        weatherReport.appendChild(day);
        weatherReport.appendChild(figure);
        weatherReport.appendChild(resumo);
        weatherReport.appendChild(min);
        weatherReport.appendChild(max);
        weatherReport.classList.add("wrapper");

        forecastDiv.appendChild(weatherReport);
    });
    return forecastDiv;
};

function requestFunction(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => {
            if (response.status === 200) {
                resolve(response.json());
            } else {
                reject(new Error('Request failed'));
            };
        })
    });
};