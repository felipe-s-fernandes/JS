const requestButton = document.querySelector("#request-button");
const tableContainer = document.querySelector("#table-container")
const body = document.querySelector("body");

requestButton.addEventListener('click', () => {
    createTable();
});

function createTable() {
    tableContainer.innerHTML = '';
    const table = document.createElement("table");
    tableContainer.appendChild(table)
    table.innerHTML = '';
    table.appendChild(tableHeading());
    tableContent(table);
};

function tableHeading() {
    const tableHeading = document.createElement("tr");
    const date = document.createElement("td");
    const time = document.createElement("td");
    const ask = document.createElement("td");
    const bid = document.createElement("td");
    const high = document.createElement("td");
    const low = document.createElement("td");

    date.innerText = 'Date';
    time.innerText = 'Time';
    ask.innerText = 'Ask';
    bid.innerText = 'Bid';
    low.innerText = 'Low';
    high.innerText = 'High';

    const headingElements = [date, time, ask, bid, high, low];
    headingElements.forEach((element) => {
        tableHeading.appendChild(element);
    });
    tableHeading.classList.add('heading')
    return tableHeading;
};

function tableRow(object) {
    const tableRow = document.createElement("tr");
    const date = document.createElement("td");
    const time = document.createElement("td");
    const ask = document.createElement("td");
    const bid = document.createElement("td");
    const high = document.createElement("td");
    const low = document.createElement("td");

    date.innerText = object.create_date.slice(0, 10);
    time.innerText = object.create_date.slice(11);
    ask.innerText = object.ask;
    bid.innerText = object.bid;
    low.innerText = object.low;
    high.innerText = object.high;

    const rowElements = [date, time, ask, bid, high, low];
    rowElements.forEach((element) => {
        tableRow.appendChild(element);
    });

    return tableRow;
};

function tableContent(table) {
    const currency = document.querySelector("#currency").value;
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;

    const begin = new Date(startDate);
    const end = new Date(endDate);

    while (begin.getTime() <= end.getTime()) {
        fetch(createUrl(currency, begin))
        .then((response) => response.json())
        .then((data) => {
            table.appendChild(tableRow(data[0]));
            requestButton.disabled = true;
            requestButton.style.cursor = 'wait';
        })
        .then(() => {
            requestButton.disabled = false;
            requestButton.style.cursor = 'pointer';
        });
        begin.setDate(begin.getDate() + 1);
    };
};

function createUrl(currency, date) {
    return `https://economia.awesomeapi.com.br/json/daily/${currency}?start_date=20001130&end_date=${formatDate(date.toISOString().slice(0,10))}`;
};

function formatDate(date) {
    const year = date.slice(0,4);
    const month = date.slice(5,7);
    const day = date.slice(8,10);
    return year + month + day;
};