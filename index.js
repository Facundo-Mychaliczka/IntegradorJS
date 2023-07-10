// ---- //

  // HEADER//

// BOTONES DE LOGIN
const accountBtn = document.querySelector(".account-icon")
const accountLog = document.querySelector(".acc-cont")
// BOTONES DE CARRITO
const cartBtn = document.querySelector(".cart-icon")
const cartCont = document.querySelector(".cart-container")
// BLUR DEL FONDO AL ACTIVAR cart, ACC, O HAMBURGUESA
const fondoBlur = document.querySelector(".fondoBlur")
// BOTON Y MENÚ HAMBURGUESA EN SMALL DVCS
const hambButtonSmall = document.querySelector(".navicon")
const menuSmall = document.querySelector(".navsmall")
const cart = document.querySelector(".cart")
//------------//
  //CONTENEDORES Y BOTONES DE LOS PRODUCTOS//
const productsContainer = document.querySelector(".products-container")
const showMoreBtn = document.querySelector(".showMoreBtn")
const categoriesContainer = document.querySelector(".filter-container")
const categoriesList = document.querySelectorAll(".category")
const productBtn = document.querySelector(".productBtn")
//----//
// CONTENEDOR DE LOS PRODUCTOS DEL CART//
const itemsCart = document.querySelector(".items-container")
const cartItem = document.querySelector(".cart-item")
const totalCart = document.querySelector(".cart-total")


// BOTONES DEL CARRITO
const buyCartBtn = document.querySelector(".cart-buy")
const removeCartBtn = document.querySelector(".cart-remove")

// DIV DEL MENSAJE AL AGREGAR UN PRODUCTO AL CART
const successModal=document.querySelector(".fedbackCart")


// LOGICA DEL CARRITO (GUARDAR EN LOCAL)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
////


// FUNCIONALIDAD DE BOTON DE ACCOUNTS, JUNTO A QUE DESAPAREZCA SI HAY ALGUN OTRO MENÚ ABIERTO
let toggleLog = () => {
    accountLog.classList.toggle("hidden")
    if (!cartCont.classList.contains("hidden") || !menuSmall.classList.contains("hidden")) {
        cartCont.classList.add("hidden") || menuSmall.classList.add("hidden")
        return
    }
    fondoBlur.classList.toggle("show-fondoBlur");
}
// FUNCIONALIDAD DE BOTON DE CART, JUNTO A QUE DESAPAREZCA SI HAY ALGUN OTRO MENÚ ABIERTO
let toggleCart = () => {
    cartCont.classList.toggle("hidden");
    if (!accountLog.classList.contains("hidden") || !menuSmall.classList.contains("hidden"))  {
        accountLog.classList.add("hidden") || menuSmall.classList.add("hidden")
        return
    }
    fondoBlur.classList.toggle("show-fondoBlur");
}

//FUNCIONALIDADES DEL CART//

const createCartProductTemplate = (cartProduct) => {
    const {id, value, image, name, quantity} = cartProduct
    return `
            <div class="cart-item">
                <img src="${image}">
                <div class="item-caract">
                    <p class="item-name">${name}</p>
                    <p class="item-value">${value} U$D</p>
                </div>
                <div class="quantitys-handler">
                    <p class="quantity-handler down" data-id=${id}>-</p>

                    <p class="quantity">${quantity}</p>

                    <p class="quantity-handler up" data-id=${id}>+</p>
                     </div>
            </div>
    `
}


const removeCartProduct = (productFromCart) => {
    carrito = carrito.filter((product) => {
        return product.id !== productFromCart.id;
    });
    showSuccesModal("El producto ha sido eliminado del carrito.")
    updateCartState();
}

const removeUnitFromCartProduct = (productFromCart) => {
    carrito = carrito.map((product) => {
        return product.id === productFromCart.id
            ? {...product, quantity: Number(product.quantity - 1)}
            : product;
    })
}

const handleMinusEvent = (id) => {
    const existingCartProduct = carrito.find((item) =>item.id === id);
        if (existingCartProduct.quantity === 1) {
            // Remover el producto del carrito 
            if (window.confirm("¿Desea eliminar el producto de su carrito?")) {
                removeCartProduct(existingCartProduct)
            }
            return;
        }
        removeUnitFromCartProduct(existingCartProduct)
} 

const handleUpEvent = (id) => {
    const existingCartProduct = carrito.find((item) => item.id === id)
    addUnitToCartProduct(existingCartProduct)
}

const quantityCartHandler = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        handleUpEvent(e.target.dataset.id)
    }
    updateCartState();
}

const removeLocalCart = () => {
    if (!carrito.length) {
        return
    }else if (window.confirm("¿Desea eliminar todo su carrito?")){
            carrito = []
            updateCartState()
            showSuccesModal("Se han eliminado los productos de su carrito.")
    }
}

const successBuy = () => {
    if (!carrito.length) {
        return
    } else if (window.confirm("¿Desea finalizar su compra?")) {
        carrito = []
        updateCartState()
        showSuccesModal("¡Muchas gracias por su compra!")
    }
}



const renderCart = () => {
    if (!carrito.length) {
        itemsCart.innerHTML = `<p class="empty-cart-msg"> Actualmente, no hay productos en el carrito. </p>`;
        return
    }
    itemsCart.innerHTML = carrito.map(createCartProductTemplate).join("");
}

const createProductData = (product) => {
    const {id, name, value, image} = product
    return {id, name, value, image}
}

const isExistingCartProduct = (productId) => {
    return carrito.find((item) => {
        return item.id === productId
    })
}

const addUnitToCartProduct = (product) => {
    carrito = carrito.map((cartProduct) => {
        return cartProduct.id === product.id
         ? {...cartProduct, quantity: cartProduct.quantity + 1}
         : cartProduct
    })
}

const showSuccesModal = (msg) => {
    successModal.classList.add("feedbackActive")
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("feedbackActive")
    }, 2000)
}

const createCartProduct = (product) => {
    carrito = [
        ...carrito,
        {
            ...product,
            quantity: 1,
        }
    ]
}

// CAMBIAR EL DISABLED DE LOS BOTONES DEL CART
const disableBtn = (btn) => {
    if (!carrito.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled")
    }
}

const updateCartState = () => {
    //guardar carrito en el local storage
    guardarCarrito()
    //renderizar carrito
    renderCart();
    //mostrar el total del carrito
    showTotalCart();
    //disable de botones comprar y vaciar carrito
    disableBtn(buyCartBtn)
    disableBtn(removeCartBtn)
}

// FUNCIONALIDAD CE LOS BOTONES DE LOS PRODUCTOS DE AÑADIR AL CARRITO

const addCartProduct = (e) => {
    if(!e.target.classList.contains("productBtn")) {
        return
    }
    const product = createProductData(e.target.dataset);
    // si el product ya está en el carrito
    if (isExistingCartProduct(product.id)) {
        //se agrega una unidad en el carrito
        addUnitToCartProduct(product)
        //feedback
        showSuccesModal("Se agregó una unidad al carrito.")
    }else {
        //si el product no está en en carrito
         //se crea el nuevo producto en el array
         createCartProduct(product);
        //feedback
        showSuccesModal("El producto ha sido añadido con éxito.")
    }
    
    //actualizamos data del carrito
    updateCartState();
}


// TOTAL DE LA COMPRA DEL CARRITO 
const getCartTotal = () => {
    return carrito.reduce ((acc, val) => {
        return acc + Number(val.value) * Number(val.quantity);
    },0)
}

const showTotalCart = () => {
    totalCart.innerHTML = `TOTAL : ${getCartTotal()} U$D`
}


//------//


// FUNCIONALIDAD DE MENU HAMBURGUESA EN SMALL DEVICES, JUNTO A QUE DESAPAREZCA SI HAY ALGUN OTRO MENÚ ABIERTO
let toggleMenu = () => {
    menuSmall.classList.toggle("hidden")

    if (!accountLog.classList.contains("hidden") || !cartCont.classList.contains("hidden")) {
        accountLog.classList.add("hidden") || cartCont.classList.add("hidden")
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
    cartCont.classList.add("hidden");
    menuSmall.classList.add("hidden")
    fondoBlur.classList.remove("show-fondoBlur")
}


// RENDERIZAR LOS PRODUCTOS EN EL HTML//


// POR CADA PRODUCTO, QUE HAGA ESTO//
const createProductTemplate = (product) => {
    const {id, name, value, garantía, image} = product 
    return `
    <div class="product">
                <img class="product-img" src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p>${value} USD</p>
                <p>Garantía de ${garantía}</p>
                <button
                class="productBtn"
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
    productsContainer.innerHTML += productList.map(createProductTemplate).join("")
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
    productsContainer.innerHTML = "";
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
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showTotalCart)
    productsContainer.addEventListener("click", addCartProduct)
    itemsCart.addEventListener("click", quantityCartHandler)
    disableBtn(buyCartBtn)
    disableBtn(removeCartBtn)
    removeCartBtn.addEventListener("click", removeLocalCart)
    buyCartBtn.addEventListener("click", successBuy)
    window.addEventListener("scroll", disableNav)
}

init ();