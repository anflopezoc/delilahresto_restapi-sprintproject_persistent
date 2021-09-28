const products = [
    {
        id:1,
        productName: "Bagel de salmón",
        price: 30000,
        description: "Un bagel con lonjas de salmón ahumado con aceite de oliva, queso crema y salsas al gusto.",
        q:1
    },
    {   
        id:2,
        productName: "Hamburguesa clásica",
        price: 15000,
        description: "Ban tradicional tipo hamburguesa con 200g de carne de res y cerdo, lonja de queso, rodajas de romate y cebolla, aguacate y salsas al gusto.",
        q:1
    },
    {   
        id:3,
        productName: "Sandwich veggie",
        price: 12500,
        description: "Pan bagguette corto rodajas de berenjena asada, tomate y cebolla, aguacate y salsas al gusto. ",
        q:1
    },
    {   
        id:4,
        productName: "Ensalada Veggie",
        price: 13000,
        description: "Ensalada de zanahoria, zucchini amarillo, tomate cherry, cebolla, aguacate, maíz dulce salteado, lechuga crespa, crutones y queso de soya.",
        q:1
    },
    {   
        id:5,
        productName: "Sandwich de Focaccia y jamón",
        price: 15000,
        description: "Focaccia con lonja de jamón de cerdo, rodajas de tomate y cebolla, lonja de queso y salsas al gusto.",
        q:1
    },
    {   
        id:6,
        productName: "Sandwich con Focaccia veggie",
        price: 15000,
        description: "Focaccia con rodajas de berenjena asada, rodajas de tomate y cebolla y salsas al gusto.",
        q:1
    },
    {   
        id:7,
        productName: "Pastas napolitanas",
        price: 25000,
        description: "Pastas con salsa napolitana, acompañado con queso parmesano y hojas frescas de albahaca.",
        q:1
    },
    {   
        id:8,
        productName: "Botella de agua",
        price: 2500,
        description: "botella de agua de 250ml.",
        q:1
    },
    {   
        id:9,
        productName: "Cocacola",
        price: 3000,
        description: "botella de cocacola de 250ml.",
        q:1
    },
    {   
        id:10,
        productName: "Té de durazno",
        price: 3000,
        description: "botella con té de durazno de 250ml.",
        q:1
    }
];


const AllProducts = () => {
    return products;
}

const pushProduct = (productName,price,description) => {
    const valId = products[products.length-1].id+1;
    const newProduct =    {   
        id:valId,
        productName: productName,
        price: price,
        description: description,
        q:1
    }
   products.push(newProduct);
}

module.exports = {AllProducts, pushProduct}

