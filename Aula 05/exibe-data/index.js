function writeDateInformation() {
    const date = document.querySelector('#input').valueAsDate;
    writeNumericDate(date.getUTCDate());
    writeNumericMonth(date.getUTCMonth());
    writeNumericYear(date.getUTCFullYear());
    writeDayOfTheWeek(date.getUTCDay());
    writeMonthName(date.getUTCMonth());
    writeTimestamp(date.getTime());
}

function writeNumericDate(date) {
    document.querySelector("#date").value = date;
}

function writeNumericMonth(month) {
    document.querySelector('#month').value = month+1;
}

function writeNumericYear(year) {
    document.querySelector('#year').value = year;
}

function writeDayOfTheWeek(day) {
    let result;
    switch (day) {
        case 0: result = 'domingo'; break
        case 1: result = 'segunda'; break
        case 2: result = 'terça'; break
        case 3: result = 'quarta'; break
        case 4: result = 'quinta'; break
        case 5: result = 'sexta'; break
        case 6: result = 'sábado'; break
    }
    document.querySelector('#day').value = result;
}

function writeMonthName(month) {
    let result;
    switch(month) {
        case 0: result = 'janeiro'; break
        case 1: result = 'fevereiro'; break
        case 2: result = 'março'; break
        case 3: result = 'abril'; break
        case 4: result = 'maio'; break
        case 5: result = 'junho'; break
        case 6: result = 'julho'; break
        case 7: result = 'agosto'; break
        case 8: result = 'setembro'; break
        case 9: result = 'outubro'; break
        case 10: result = 'novembro'; break
        case 11: result = 'dezembro'; break
    }
    document.querySelector('#monthName').value = result;
}

function writeTimestamp(time) {
    document.querySelector('#timestamp').value = time;
}