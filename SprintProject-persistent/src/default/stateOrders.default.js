const db = require('../DB/db');

const stateOrdersDefault = async () => {
    await db.Stateorders.findOrCreate({
        where: 
            {
                stateName: 'Pendiente',
            },
        defaults: 
            {
                stateName: 'Pendiente',
            }
        });
    await db.Stateorders.findOrCreate({
        where: 
            {
                stateName: 'Confirmado',
            },
        defaults: 
            {
                stateName: 'Confirmado',
            }
        });
    await db.Stateorders.findOrCreate({
        where: 
            {
                stateName: 'En Preparación',
            },
        defaults: 
            {
                stateName: 'En Preparación',
            }
        });
    await db.Stateorders.findOrCreate({
        where: 
            {
                stateName: 'Enviado',
            },
        defaults: 
            {
                stateName: 'Enviado',
            }
        });
    await db.Stateorders.findOrCreate({
        where: 
            {
                stateName: 'Entregado',
            },
        defaults: 
            {
                stateName: 'Entregado',
            }
        });


};


module.exports = stateOrdersDefault


