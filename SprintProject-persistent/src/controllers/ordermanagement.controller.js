const db = require('../DB/db');

exports.allStatemethods = async (req, res) => {
    try {
        const allStatus = await db.Statusorders.findAll();
        res.status(200).json(allStatus)
    } catch (error) {
        res.status(404).json('There are error')
    }
    
};

exports.allOrders = async (req, res) => {
    try {
        const Orders = await db.Orders.findAll();
        res.status(200).json(Orders)
    } catch (error) {
        res.status(404).json('There are error')
    }
    
};

exports.stateorder = async (req, res) => {
    try {
        const order = await db.Orders.findOne({
                                            where:{
                                                id:req.params.idOrder
                                                }
                                            });
        const status = await db.Statusorders.findOne({
                                                    where:{
                                                        id:req.params.idStatus
                                                        }
                                                    });
        if (order) {
            if (status) {
                if (order.statusorderId !== 1) {
                    if (status.id !== 1) {
                         await db.Orders.update({statusorderId: status.id },{
                                                    where:{
                                                        id:order.id
                                                        }});
                        const neworderQuery = await db.Orders.findOne({
                            where:{
                                id:order.id
                                }
                            });
                        res.status(200).json(neworderQuery)
                    } else res.status(400).json(`The order cannot return to 'Pendiente' status`);
                } else res.status(400).json(`The order with id ${order.id} has not been confirmed`);
            } else res.status(400).json('The Status does no exists');
        } else res.status(400).json('The order does no exists');        
    } catch (error) {
        res.status(404).json('There are error');
    }
    
};



