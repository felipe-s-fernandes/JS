document.querySelector("#carName").addEventListener('change', () => {
    const carName = document.querySelector('#carName').value;
    const car = garage(carName);
    writeCarTraits(car);
})

function writeCarTraits(car) {
    document.querySelector("#trait").textContent = car.nickname;
    document.querySelector("#price").value = car.price;
    document.querySelector("#engine").value = car.engine;
    document.querySelector("#capacity").value = car.capacity;
    document.querySelector("#bodywork").value = car.bodywork;
    document.querySelector("#potency").value = car.potency;
    document.querySelector("figure").style.backgroundImage = `url(${car.image})`;
}

function garage(carName) {
    switch (carName) {
        case 'trailblazer': 
            return {
                price: 'R$ 100.000,00',
                engine: 'V6, dianteiro, longitudinal/24V',
                capacity: '3.564',
                bodywork: 'SUV, 4 portas, 7 lugares',
                potency: '279/35,7',
                nickname: 'O MAIS POTENTE',
                image: './car-images/trailblazer.jpg'
            };
        case 'audi': 
            return {
                price: 'R$ 100.000,00',
                engine: 'L4, dianteiro, transv, turbo/16V',
                capacity: '1.984',
                bodywork: 'Sedã, 4 portas, 5 lugares',
                potency: '220/35,7',
                nickname: 'O MAIS RÁPIDO',
                image: './car-images/a3.png'
            };
        case 'peugeot': 
            return {
                price: 'R$ 100.000,00',
                engine: 'L3, dianteiro, transversal/12V',
                capacity: '1.199',
                bodywork: 'Hatch, 4 portas, 5 lugares',
                potency: '90/13,0',
                nickname: 'O MAIS ECONÔMICO',
                image: './car-images/peugeot.jpg'
            };
        case 'bmw': 
            return {
                price: 'R$ 200.000,00',
                engine: 'L4, dianteiro, long. turbo/16V',
                capacity: '1.997',
                bodywork: 'SUV, 4 portas, 5 lugares',
                potency: '245/35,7',
                nickname: 'O MAIS CARO',
                image: './car-images/bmw.webp'
            };
        case 'onix': 
            return {
                price: 'R$ 50.000,00',
                engine: 'L4, dianteiro, transversal/8V',
                capacity: '999',
                bodywork: 'Hatch, 4 portas, 5 lugares',
                potency: '90/11,5',
                nickname: 'O MAIS VENDIDO',
                image: './car-images/onix.webp'
            };
    }
}