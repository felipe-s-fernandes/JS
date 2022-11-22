const inputName = document.querySelector("#inputNomeProduto");
const inputDescription = document.querySelector("#inputDescricaoProduto");
const inputPrice = document.querySelector("#inputValorProduto");
const buttonInclude = document.querySelector("#incluirBotao");
const buttonUpdate = document.querySelector("#atualizarBotao");
const buttonCancel = document.querySelector("#cancelarBotao");
const buttonList = document.querySelector("#listarBotao");
const errorMessage = document.querySelector("#mensagem-erro");
const productTable = document.querySelector(".tabela-produtos");
const clickedProduct = document.querySelector("#produto-clicado");
const filter = document.querySelector("#filter");
const buttonSearch = document.querySelector("#search-button")
const filterMessage = document.querySelector("#filter-message")

let productID = 1;
let targetID;
let targetName;
let productList = [];
let filteredList = [];

function verifyProduct() {
    if (inputName.value === "") {
        throw 'Insira o nome do produto!'
    };
    if (inputDescription.value === "") {
        throw 'Insira uma descrição para o produto!'
    };
    if (inputPrice.value === "") {
        throw 'Insira um valor para o produto!'
    };
};

function repeatedProduct() {
    productList.forEach((product) => {
        if (product.name === inputName.value) {
            throw 'Produto já existe!'
        };
    });
};

function productExists() {
    productList.forEach((product) => {
        if (product.name !== targetName && product.name === inputName.value) {
            throw 'Nome do produto coincide com produto existente!'
        };
    });
};

function includeProduct() {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const product = {
        id: productID,
        name: inputName.value,
        description: inputDescription.value,
        price: Number(inputPrice.value),
        timestamp: formatDate(date.toISOString())
    }
    productList.push(product);
    productID++;
    productList.forEach(element => console.log(element));
};

function formatDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const time = date.slice(11, 19);
    return `${day}/${month}/${year} - ${time}`
};

function listProducts(list) {
    let i = 0;
    productTable.innerHTML = `
                    <tr class="linha-tabela table-heading">
						<td class="id-produto">ID</td>
						<td class="nome-produto">Produto</td>
						<td class="valor-produto">Valor</td>
						<td class="editar-produto">Editar</td>
						<td class="apagar-produto">Apagar</td>
					</tr>`;
    for (let i = 0; i < list.length; i++) {
        productTable.innerHTML += `
            <tr class="linha-tabela">
                <td class="id-produto">${list[i].id}</td>
                <td class="nome-produto">${list[i].name}</td>
                <td class="valor-produto">R$ ${Number(list[i].price).toFixed(2)}</td>
                <td class="editar-produto">
                    <img src="./assets/edit.png" alt="Ícone de editar produto" />
                </td>
                <td class="apagar-produto">
                    <img src="./assets/delete.png" alt="Ícone de apagar produto" />
                </td>
            </tr>`
    };
    clickedProduct.innerHTML = '';
};

function displayEditButtons() {
    buttonInclude.classList.add("display-none");
    buttonList.classList.add("display-none");
    buttonUpdate.classList.remove("display-none");
    buttonCancel.classList.remove("display-none");
};

function displayRegularButtons() {
    buttonInclude.classList.remove("display-none");
    buttonList.classList.remove("display-none");
    buttonUpdate.classList.add("display-none");
    buttonCancel.classList.add("display-none");
};

function deleteProduct(clickedID) {
    productList.forEach((element, index) => {
        if (element.id === Number(clickedID)) {
            productList.splice(index, 1);
        };
    });
    listProducts(productList);
    clearMessage();
    displayRegularButtons();
};

function editProduct(tableLine) {
    targetID = Number(tableLine.childNodes[1].textContent);
    targetName = tableLine.childNodes[3].textContent;
    displayEditButtons();
    clearMessage();
    productList.forEach((element, index) => {
        if (element.id === targetID) {
            inputName.value = productList[index].name;
            inputDescription.value = productList[index].description;
            inputPrice.value = productList[index].price;
        };
    });
};

function clearInputs() {
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
};

function updateProduct() {
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].id === targetID) {
            productList[i].name = inputName.value;
            productList[i].description = inputDescription.value;
            productList[i].price = Number(inputPrice.value);
            listProducts(productList);
            displayRegularButtons();
            return
        };
    };
};

function showProductData(productRow) {
    const productName = productRow.childNodes[3].textContent;
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name === productName) {
            clickedProduct.innerHTML = `
                ID: ${productList[i].id}<br>
                Nome: ${productList[i].name}<br>
                Descrição: ${productList[i].description}<br>
                Preço: ${productList[i].price}<br>
                Incluído em: ${productList[i].timestamp}<br>`;
        };
    };
};

function clearMessage() {
    errorMessage.style.visibility = 'hidden';
};

function displaySuccessMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = 'green';
    errorMessage.style.visibility = 'visible';
};

function displayErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.visibility = 'visible';
};

function orderListByKey(key) {
    if (key === 'name') {
        productList.sort((a, b) => {
            if (a[key].toLowerCase() < b[key].toLowerCase()) {
                return -1;
            };
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return 1;
            };
            return 0;
        });
    };
    if (key === 'price') {
        productList.sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            };
            if (a[key] > b[key]) {
                return 1;
            };
            return 0;
        });
    };
    listProducts(productList);  
};

function productFilter() {
    if (filter.value === '') {
        listProducts(productList);
        filterMessage.textContent = '';
        return;
    } else {
        filteredList = productList.filter((product) => {
            if (product.name.includes(filter.value)) {
                return product;
            }
        });
    };
    if (productList.length !== 0) {
        if (filteredList.length === 0) {
            filterMessage.textContent = 'Não foram encontrados produtos conforme chave de pesquisa!';
        } else {
            filterMessage.textContent = `Foram encontrado(s) ${filteredList.length} produtos:`;
        };
    } else {
        filterMessage.textContent = 'Lista de produtos vazia!';
    }
    listProducts(filteredList);
};

buttonInclude.addEventListener('click', () =>{
    try {
        verifyProduct();
    } catch(error) {
        displayErrorMessage(error);
        return
    };
    try {
        repeatedProduct();
    } catch (error) {
        displayErrorMessage(error);
        return
    }
    includeProduct();
    displaySuccessMessage('Produto incluído com sucesso!');
});

buttonList.addEventListener('click', () => {
    listProducts(productList);
    clearMessage();
});

buttonUpdate.addEventListener('click', () => {
    try {
        verifyProduct();
    } catch(error) {
        displayErrorMessage(error);
        return
    };
    try {
        productExists();
    } catch(error) {
        displayErrorMessage(error);
        return
    };
    updateProduct();  
    displaySuccessMessage('Produto atualizado com sucesso!')
});

buttonCancel.addEventListener('click', ()=> {
    clearInputs();
    clearMessage();
    displayRegularButtons();
});

productTable.addEventListener('click', (event) => {
    if (event.target.parentElement.className === 'editar-produto') {
        editProduct(event.target.parentElement.parentElement);
        return
    };
    if (event.target.parentElement.className === 'apagar-produto') {
        deleteProduct(event.target.parentElement.parentElement.childNodes[1].textContent);
        return
    };
    if (event.target.className === 'nome-produto') {
        showProductData(event.target.parentElement);
        if (event.target.parentElement.classList[1] === 'table-heading') {
            orderListByKey('name');
        }
    };
    if (event.target.className === 'valor-produto' && event.target.parentElement.classList[1] === 'table-heading') {
        orderListByKey('price');
    };
});

buttonSearch.addEventListener('click', () => {
    productFilter();
});