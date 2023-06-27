// ---- //

// TODO ESTO ES DEL HEADER //

// BOTONES DE LOGIN
const accountBtn = document.querySelector(".account-icon")
const accountLog = document.querySelector(".acc-cont")
// BOTONES DE CARRITO
const cartBtn = document.querySelector(".cart-icon")
const cart = document.querySelector(".cart-container")
// BLUR DEL FONDO AL ACTIVAR cart, ACC, O HAMBURGUESA
const fondoBlur = document.querySelector(".fondoBlur")
// BOTON Y MENÚ HAMBURGUESA EN SMALL DVCS
const hambButtonSmall = document.querySelector(".navicon")
const menuSmall = document.querySelector(".navsmall")

//CONTENEDORES Y BOTONES DE LOS PRODUCTOS//
const productContainer = document.querySelector(".products-container")
const showMoreBtn = document.querySelector(".showMoreBtn")
const categoriesContainer = document.querySelector(".filter-container")
const categoriesList = document.querySelectorAll(".category")


// FUNCIONALIDAD DE BOTON DE ACCOUNTS, JUNTO A QUE DESAPAREZCA SI HAY ALGUN OTRO MENÚ ABIERTO
let toggleLog = () => {
    accountLog.classList.toggle("hidden")
    if (!cart.classList.contains("hidden") || !menuSmall.classList.contains("hidden")) {
        cart.classList.add("hidden") || menuSmall.classList.add("hidden")
        return
    }
    fondoBlur.classList.toggle("show-fondoBlur");
}
// FUNCIONALIDAD DE BOTON DE CART, JUNTO A QUE DESAPAREZCA SI HAY ALGUN OTRO MENÚ ABIERTO
let toggleCart = () => {
    cart.classList.toggle("hidden");
    if (!accountLog.classList.contains("hidden") || !menuSmall.classList.contains("hidden"))  {
        accountLog.classList.add("hidden") || menuSmall.classList.add("hidden")
        return
    }
    fondoBlur.classList.toggle("show-fondoBlur");

}
// FUNCIONALIDAD DE MENU HAMBURGUESA EN SMALL DEVICES, JUNTO A QUE DESAPAREZCA SI HAY ALGUN OTRO MENÚ ABIERTO
let toggleMenu = () => {
    menuSmall.classList.toggle("hidden")

    if (!accountLog.classList.contains("hidden") || !cart.classList.contains("hidden")) {
        accountLog.classList.add("hidden") || cart.classList.add("hidden")
        return
    }
    fondoBlur.classList.toggle("show-fondoBlur");
}

// FUNCIONALIDAD AL HACER CLICK EN UN a EN EL MENÚ HAMBURGUESA QUE HAGA UN TOGGLE AL FONDO BLUR Y AL DISPLAY DEL MENÚ
const toggleBgDisplay = () => {
    menuSmall.classList.toggle("hidden")
    fondoBlur.classList.toggle("show-fondoBlur")
}

// FUNCIONALIDAD AL HACER CLICK EN EL FONDO BLUR QUE DESAPAREZCA LO QUE ESTÁ ABIERTO
let disableNav = () => {
    accountLog.classList.add("hidden");
    cart.classList.add("hidden");
    menuSmall.classList.add("hidden")
    fondoBlur.classList.remove("show-fondoBlur")
}


// RENDERIZAR LOS PRODUCTOS EN EL HTML//


// POR CADA PRODUCTO, QUE HAGA ESTO//
const createProductTemplate = (product) => {
    const {id, name, value, garantía, image} = product 
    return `
    <div class="product">
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p>${value} USD</p>
                <p>Garantía de ${garantía}</p>
                <button
                data-id= "${id}",
                data-name= "${name}",
                data-value= "${value}",
                data-image= "${image}",
                >Añadir al carrito</button>
            </div>
    `
}


// EL MAP, VA POR CADA UNO DE ESOS OBJETOS (productos), Y RECIBE EL CALLBACK DE LA FUNCION DE ARRIBA//

const renderProducts = (productList) => {
    productContainer.innerHTML += productList.map(createProductTemplate).join("")
}

// FUNCION PARA BOTON DE VER MÁS//

const indexEsMenor = () => {
    return appState.currentProductIndex === appState.productLimit -1;
}

const showMoreProducts = () => {
    appState.currentProductIndex += 1;
    let {products, currentProductIndex} = appState
    renderProducts(products[currentProductIndex])
    if (indexEsMenor()) {
        showMoreBtn.classList.add("hidden")
    }
}

// FILTRO DE PRODUCTOS//


// VALIDACION (SI ES UN FILTRO INACTIVO, DEVUELVE TRUE)
const isAnInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")        
    )
}

// MOSTRAR O NO EL BOTON DE VER MÁS//
const mostrarBotonVerMas = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return
    }
    showMoreBtn.classList.add("hidden")
}


const changeClassActive = (selectecCategory) => {
    // HAGO UN SPREAD (COPIA) DE LA HTML COLLECTION
    const categories = [...categoriesList]
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category != selectecCategory){
        categoryBtn.classList.remove("active")
        return;
    }
    categoryBtn.classList.add("active");
    });
};

// CAMBIAR ESTADO DEL FILTRO//

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeClassActive(appState.activeFilter)
    mostrarBotonVerMas();
};


// RENDERIZAR PRODUCTOS FILTRADOS//

const renderFilteredProducts = () => {
    const filteredProducts = productos.filter((producto) => {
        return producto.category === appState.activeFilter;
    });
    renderProducts(filteredProducts);
};

// FUNCION "FILTRADORA"//
const aplicarFiltro = ({target}) => {
    // CHECKEAR QUE SEA UN BOTON Y QUE NO ESTÉ ACTIVO//
    if (!isAnInactiveFilterBtn(target)) {
        return
    };
    // CAMBIAR EL ESTADO DEL FILTRO//
    changeFilterState(target);
    // SI HAY FILTRO ACTIVO, RENDERIZO PRODUCTOS FILTRADOS//
    productContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductIndex = 0;
        return
    };
    // SI NO HAY PRODUCTOS FILTRADOS, RENDERIZO PRIMER ARRAY//
    renderProducts(appState.products[0]);
}



let init = () => {
    renderProducts(appState.products[appState.currentProductIndex]);
    accountBtn.addEventListener("click", toggleLog);
    cartBtn.addEventListener("click", toggleCart);
    fondoBlur.addEventListener("click", disableNav);
    hambButtonSmall.addEventListener("click", toggleMenu)
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", aplicarFiltro)
    menuSmall.addEventListener("click", toggleBgDisplay)
}

init ();