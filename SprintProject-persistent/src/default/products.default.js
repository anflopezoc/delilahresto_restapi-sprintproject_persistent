const db = require('../DB/db');

const productsDefault = async () => {
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Bagel de salmón',
            },
        defaults: 
            {
            productName: 'Bagel de salmón',
            price: 30000
            }
        });

    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Hamburguesa clásica',
            },
        defaults: 
            {
            productName: 'Hamburguesa clásica',
            price: 15000
            }
        });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Sandwich veggie',
            },
        defaults: 
            {
            productName: 'Sandwich veggie',
            price: 12500
            }
        });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Ensalada Veggie',
            },
        defaults: 
            {
            productName: 'Ensalada Veggie',
            price: 13000
            }
        });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Sandwich de Focaccia y jamón',
            },
        defaults: 
            {
            productName: 'Sandwich de Focaccia y jamón',
            price: 15000
            }
        });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Sandwich con Focaccia veggie',
            },
        defaults: 
            {
            productName: 'Sandwich con Focaccia veggie',
            price: 15000
            }
        });

    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Pastas napolitanas',
            },
        defaults: 
            {
            productName: 'Pastas napolitanas',
            price: 25000
            }
        });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Botella de agua',
            },
        defaults: 
            {
            productName: 'Botella de agua',
            price: 2500
            }
        });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Cocacola',
            },
        defaults: 
            {
            productName: 'Cocacola',
            price: 3000
            }
            });
    await db.Products.findOrCreate({
        where: 
            {
            productName: 'Té de durazno',
            },
        defaults: 
            {
            productName: 'Té de durazno',
            price: 3000
            }
            })
};


module.exports = productsDefault