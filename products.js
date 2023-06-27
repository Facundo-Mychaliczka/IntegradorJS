const productos = [
    {
        id: 1,
        name: "AORUS Geforce RTX 4060 ELITE 8GB",
        value: 200,
        garantía: "2 años",
        category: "grafica",
        image: "./assets/GRAFICAS/AORUS GeForce RTX 4060 ELITE 8GB.png"
    },
    {
        id: 2,
        name: "AORUS GeForce RTX 4080 16GB MASTER",
        value: 170,
        garantía: "1 año",
        category: "grafica",
        image: "./assets/GRAFICAS/AORUS GeForce RTX 4080 16GB MASTER.png"
    },
    {
        id: 3,
        name: "AORUS GeForce RTX 4090 XTREME WATERFORCE 24GB",
        value: 300,
        garantía: "2 años",
        category: "grafica",
        image: "./assets/GRAFICAS/AORUS GeForce RTX 4090 XTREME WATERFORCE 24G.png"
    },
    {
        id: 4,
        name: "AORUS GeForce RTX 5080 16GB XTREME WATERFORCE",
        value: 350,
        garantía: "2 años",
        category: "grafica",
        image: "./assets/GRAFICAS/AORUS GeForce RTX 5080 16GB XTREME WATERFORCE.png"
    },
    {
        id: 5,
        name: "AORUS 7 (2023)Laptop",
        value: 250,
        garantía: "2 años",
        category: "laptop",
        image: "./assets/LAPTOPS/AORUS 7 (2023) Laptop.png"
    },
    {
        id: 6,
        name: "AORUS 15 (2023)Laptop",
        value: 150,
        garantía: "1 año",
        category: "laptop",
        image: "./assets/LAPTOPS/AORUS 15 (2023) Laptop.png"
    },
    {
        id: 7,
        name: "AORUS 17 (2023)Laptop",
        value: 270,
        garantía: "2 años",
        category: "laptop",
        image: "./assets/LAPTOPS/AORUS 17 (2023) Laptop.png"
    },
    {
        id: 8,
        name: "AORUS 17X (2023)Laptop",
        value: 300,
        garantía: "2 años",
        category: "laptop",
        image: "./assets/LAPTOPS/AORUS 17X (2023) Laptop.png"
    },
    {
        id: 9,
        image: "./assets/MONITORES/AORUS CV27F Gaming Monitor.png",
        name: "AORUS CV27F Gaming Monitor",
        value: 60,
        garantía: "1 año",
        category: "monitor",
    },
    {
       id: 10,
       image: "./assets/MONITORES/AORUS F048U Gaming monitor.png",
       name: "AORUS F048U Gaming Monitor",
       value: 90,
       garantía: "1 año",
       category: "monitor",
    },
    {
        id: 11,
        image: "./assets/MONITORES/AORUS F127Q-P Gaming Monitor.png",
        name: "AORUS F12Q-P Gaming Monitor",
        value: 110,
        garantía: "2 años",
        category: "monitor"
     },
     {
        id: 12,
        image: "./assets/MONITORES/AORUS FI32U Gaming Monitor.png",
        name: "AORUS FI32U Gaming Monitor",
        value: 120,
        garantía: "1 año",
        category: "monitor",
     },
     {
        id: 13,
        image: "./assets/MOTHERBOARDS/A690 AORUS ELITE AX.png",
        name: "Motherboard A690 AORUS ELITE AX.",
        value: 98,
        garantía: "3 años",
        category: "motherboard",
     },
     {
        id: 14,
        image: "./assets/MOTHERBOARDS/B550M AORUS ELITE AX Mother.png",
        name: "Motherboard B550M AORUS ELITE AX.",
        value: 150,
        garantía: "2 años",
        category: "motherboard",
     },
     {
        id: 15,
        image: "./assets/MOTHERBOARDS/B55OM AORUS PRO-P Mother.png",
        name: "Motherboard B55OM AORUS PRO-P",
        value: 100,
        garantía: "1 año",
        category: "motherboard",
     },
     {
        id: 16,
        image: "./assets/MOTHERBOARDS/Z790 AORUS ELITE.png",
        name: "Motherboard Z790 AORUS ELITE",
        value: 80,
        garantía: "3 años",
        category: "motherboard",
     },
     {
        id: 17,
        image: "./assets/PERIFERICOS/AGC300 Gaming Chair.png",
        name: "Gaming Chair AGC300",
        value: 150,
        garantía: "1 año",
        category: "periferico",
     },
     {
        id: 18,
        image: "./assets/PERIFERICOS/AGC310 Gaming Chair.png",
        name: "Gaming Chair AGC310",
        value: 170,
        garantía: "1 año",
        category: "periferico",
     },
     {
        id: 19,
        image: "./assets/PERIFERICOS/AORUS K1 Keyboard.png",
        name: "AORUS K1 KEYBOARD",
        value: 100,
        garantía: "2 años",
        category: "periferico",
     },
     {
        id: 20,
        image: "./assets/PERIFERICOS/AORUS K7 Keyboard.png",
        name: "AORUS K7 KEYBOARD",
        value: 130,
        garantía: "2 años",
        category: "periferico",
     },
     {
        id: 21,
        image: "./assets/PERIFERICOS/AORUS K9 Optical Keyboard.png",
        name: "AORUS K9 Optical KEYBOARD",
        value: 170,
        garantía: "3 años",
        category: "periferico",
     },
     {
        id: 22,
        image: "./assets/PERIFERICOS/AORUS M4 Mouse.png",
        name: "AORUS M4 Gaming Mouse",
        value: 90,
        garantía: "2 años",
        category: "periferico",
     },
     {
        id: 23,
        image: "./assets/PERIFERICOS/AORUS M5 Mouse.png",
        name: "AORUS M5 Gaming Mouse",
        value: 120,
        garantía: "3 años",
        category: "periferico",
     },
]


const dividirProductos = (size) => {
    let productList = []
    for (let i = 0; i < productos.length; i+= size) {
         productList.push(productos.slice(i, i + size))
    };
    return productList
};


const appState = {
    products: dividirProductos(6),
    currentProductIndex: 0,
    productLimit: dividirProductos(6).length,
    activeFilter: null,
}