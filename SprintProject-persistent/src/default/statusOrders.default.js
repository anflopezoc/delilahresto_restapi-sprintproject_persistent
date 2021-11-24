const db = require('../DB/db');

const statusOrdersDefault = async () => {
    await db.Statusorders.findOrCreate({
        where: 
            {
                statusName: 'Pending',
            },
        defaults: 
            {
                statusName: 'Pending',
            }
        });
    await db.Statusorders.findOrCreate({
        where: 
            {
                statusName: 'Confirmed',
            },
        defaults: 
            {
                statusName: 'Confirmed',
            }
        });
    await db.Statusorders.findOrCreate({
        where: 
            {
                statusName: 'In Preparation',
            },
        defaults: 
            {
                statusName: 'In Preparation',
            }
        });
    await db.Statusorders.findOrCreate({
        where: 
            {
                statusName: 'Shipped',
            },
        defaults: 
            {
                statusName: 'Shipped',
            }
        });
    await db.Statusorders.findOrCreate({
        where: 
            {
                statusName: 'Delivered',
            },
        defaults: 
            {
                statusName: 'Delivered',
            }
        });


};


module.exports = statusOrdersDefault


