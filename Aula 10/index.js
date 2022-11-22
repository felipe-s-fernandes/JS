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

let productID = 1;
let targetID;
let targetName;
let productList = [];

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
    let i = 0;
    while (i < productList.length) {
        if (productList[i].name === inputName.value) {
            throw 'Produto já existe!'
        };
        i++;
    };
};

function productExists() {
    let i = 0;
    while(i < productList.length) {
        if (productList[i].name !== targetName) {
            if (productList[i].name === inputName.value) {
                throw 'Nome do produto coincide com produto existente!'
            };
        };
        i++;
    };
};

function includeProduct() {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const product = {
        id: productID,
        name: inputName.value,
        description: inputDescription.value,
        price: inputPrice.value,
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

function listProducts() {
    let i = 0;
    productTable.innerHTML = `
                    <tr class="linha-tabela table-heading">
						<td class="id-produto">ID</td>
						<td class="nome-produto">Produto</td>
						<td class="valor-produto">Valor</td>
						<td class="editar-produto">Editar</td>
						<td class="apagar-produto">Apagar</td>
					</tr>`;
    while (i < productList.length) {
        productTable.innerHTML += `
            <tr class="linha-tabela">
                <td class="id-produto">${productList[i].id}</td>
                <td class="nome-produto">${productList[i].name}</td>
                <td class="valor-produto">R$ ${Number(productList[i].price).toFixed(2)}</td>
                <td class="editar-produto">
                    <img src="./assets/edit.png" alt="Ícone de editar produto" />
                </td>
                <td class="apagar-produto">
                    <img src="./assets/delete.png" alt="Ícone de apagar produto" />
                </td>
            </tr>`
        i++
    };
    clickedProduct.innerHTML = '';
};

function editProduct(tableLine) {
    targetID = Number(tableLine.childNodes[1].textContent);
    targetName = tableLine.childNodes[3].textContent;
    const rowIndex = tableLine.rowIndex - 1;
    displayEditButtons();
    clearMessage();
    inputName.value = productList[rowIndex].name;
    inputDescription.value = productList[rowIndex].description;
    inputPrice.value = productList[rowIndex].price;
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

function deleteProduct(tableLine) {
    console.log(tableLine);
    const rowIndex = tableLine.rowIndex - 1;
    productList.splice(rowIndex, 1);
    listProducts();
    clearMessage();
    displayRegularButtons();
};

function clearInputs() {
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
};

function updateProduct() {
    let i = 0;
    while (i < productList.length) {
        if (productList[i].id === targetID) {
            productList[i].name = inputName.value;
            productList[i].description = inputDescription.value;
            productList[i].price = inputPrice.value;
            listProducts();
            displayRegularButtons();
            return
        }
        i++;
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
    listProducts();
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
        deleteProduct(event.target.parentElement.parentElement);
        return
    };
    if (event.target.className === 'nome-produto') {
        showProductData(event.target.parentElement);
    };
});

function showProductData(productRow) {
    let i = 0;
    const productName = productRow.childNodes[3].textContent;
    while (i < productList.length) {
        if (productList[i].name === productName) {
            clickedProduct.innerHTML = `
                ID: ${productList[i].id}<br>
                Nome: ${productList[i].name}<br>
                Descrição: ${productList[i].description}<br>
                Preço: ${productList[i].price}<br>
                Incluído em: ${productList[i].timestamp}<br>`;
        };
        i++;
    };
};