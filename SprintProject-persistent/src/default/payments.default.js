const db = require('../DB/db');

const paymentsDefault = async () => {
    await db.Payments.findOrCreate({
        where: 
            {
                method: 'Nequi',
            },
        defaults: 
            {
                method: 'Nequi',
            }
        });
    await db.Payments.findOrCreate({
        where: 
            {
                method: 'Transferencia Bancaria',
            },
        defaults: 
            {
                method: 'Transferencia Bancaria',
            }
        });
    await db.Payments.findOrCreate({
        where: 
            {
                method: 'Tarjeta debito/credito',
            },
        defaults: 
            {
                method: 'Tarjeta debito/credito',
            }
        });
    await db.Payments.findOrCreate({
        where: 
            {
                method: 'Efectivo',
            },
        defaults: 
            {
                method: 'Efectivo',
            }
        });
        
};


module.exports = paymentsDefault;
