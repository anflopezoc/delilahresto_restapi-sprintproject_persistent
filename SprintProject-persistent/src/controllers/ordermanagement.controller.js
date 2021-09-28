const db = require('../DB/db');

exports.allStatemethods = async (req, res) => {
    try {
        const States = await db.Stateorders.findAll();
        res.status(200).json(States)
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
        const state = await db.Stateorders.findOne({
                                                    where:{
                                                        id:req.params.idState
                                                        }
                                                    });
        if (order) {
            if (state) {
                if (order.stateorderId !== 1) {
                    if (state.id !== 1) {
                         await db.Orders.update({stateorderId: state.id },{
                                                    where:{
                                                        id:order.id
                                                        }});
                        const neworderQuery = await db.Orders.findOne({
                            where:{
                                id:order.id
                                }
                            });
                        res.status(200).json(neworderQuery)
                    } else res.status(400).json(`The order cannot return to 'Pendiente' state`);
                } else res.status(400).json(`The order with id ${order.id} has not been confirmed`);
            } else res.status(400).json('The State does no exists');
        } else res.status(400).json('The order does no exists');        
    } catch (error) {
        res.status(404).json('There are error');
    }
    
};



