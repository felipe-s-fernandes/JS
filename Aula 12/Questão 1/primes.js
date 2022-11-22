const result = document.querySelector("#result");

function primeNumbers() {
    let primes = 0;
    const end = Number(document.querySelector("#end").value);
    for (let i = 2; i <= end; i++) {
        primes++;
        for (let j = 2; j < i; j++) {
            if (i%j === 0) {
                primes--;
                break;
            };
        };
    };
    result.textContent = `Existem ${primes} números primos de 0 a ${end}`;
};