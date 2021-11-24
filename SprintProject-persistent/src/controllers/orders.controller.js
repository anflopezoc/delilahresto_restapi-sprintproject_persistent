const db= require('../DB/db');
const {findOrder, orderCostCalculator, findAllorders} = require('./functions/orders.functions');


//Funtion OrderCost Calculator, return query from Order



//Get order from the user.
exports.Order = async (req, res) => {
    try {
        const user = await db.Users.findOne({where:{email:req.user.email}});
        const Order = await findOrder(user)
        if (Order) {
            res.status(200).json(Order)
        } else res.status(400).json('There are no orders from you')
    } catch (error) {
        res.status(404).json('There are error')
    }
};


// Create or get order and add product to the order
exports.addProductOrder = async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await db.Products.findOne({
                        where:{id,isActive: true}
                        });
        const user = await db.Users.findOne({
                        where:{email: req.user.email}
                        });
        const order = await findOrder(user);
                
        if (!product) res.status(400).json(`Product ID ${id} does not exist`);
        else {
            const productInOrder = await  db.OrderProducts.findOne({
                                                                where:{
                                                                    productId:id,
                                                                    orderId:order.id
                                                                    }
                                                                });
            if (productInOrder) {
                await db.OrderProducts.update(
                                        {quantity: productInOrder.quantity +1},
                                        {where:{id:productInOrder.id }}
                                        );
                const orderCostIn = await orderCostCalculator(order.id)
                res.status(200).json(orderCostIn)
                
            } else {
                await db.OrderProducts.create({
                                            productName:product.productName,
                                            price: product.price,
                                            productId:product.id,
                                            orderId:order.id}); 
    
                const orderCostIn = await orderCostCalculator(order.id)
                res.status(200).json(orderCostIn)    
            }  
        }
    } catch (error) {
        res.status(404).json('There are error')
    }
};


//Substract products from the order
exports.substractProductOrder= async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await db.Products.findOne({
                                                where:{
                                                    id,
                                                    isActive: true
                                                }
                                            });
        const user = await db.Users.findOne({
                                            where:{
                                                email: req.user.email
                                            }
                                        });
        const order = await findOrder(user);
                            
        if (!product) res.status(400).json(`Product ID ${id} does not exist`)
        else {
            const productInOrder = await  db.OrderProducts.findOne({where:{productId:id,orderId:order.id}});
            if (productInOrder) {
                if(productInOrder.quantity > 1){
                    await db.OrderProducts.update(
                                            {quantity: productInOrder.quantity-1},
                                            {where:{id:productInOrder.id }}
                                            );
                    const orderCostIn = await orderCostCalculator(order.id);
                    res.status(200).json(orderCostIn);
                } else {
                    await db.OrderProducts.destroy({
                                where:{id:productInOrder.id}
                    })
                    const orderCostIn = await orderCostCalculator(order.id);
                    res.status(200).json(orderCostIn);
                };                
            } else res.status(400).json('The product does not exists in the order.')
        }
    } catch (error) {
        res.status(404).json('There are error')
    }
};


//Add Address to the order
exports.addAddress = async (req, res) => {    
    try {
        const id = parseInt(req.params.id);
        const user = await db.Users.findOne({
                                        where:{
                                            email: req.user.email
                                        }
                                    });
        const address = await db.Addresses.findOne({
                                                    where:{id,
                                                        userId:user.id, 
                                                        isActive: true}
                                                    });
        if (address) {
            await db.Orders.update({addressId:id},
                                {where:{userId:user.id,
                                    statusorderId:1}});
            const order = await findOrder(user)
            res.status(200).json(order)
            
        } else res.status(400).json(`Address ID ${id} does no exist in your address book`)
    
    } catch (error) {
        res.status(404).json('There are error')
    }
};


//Add Payment Method to the order
exports.addPaymentMethod = async (req, res) => {    
    try {
        const id = parseInt(req.params.id);
        const user = await db.Users.findOne({where:{email: req.user.email}});
        const payment = await db.Payments.findOne({
                                                    where:{id, 
                                                        isActive: true}
                                                    });
        if (payment) {
            await db.Orders.update({paymentmethodId:payment.id},
                                {where:{userId:user.id,
                                    statusorderId:1}});
            const order = await findOrder(user)
            res.status(200).json(order)
            
        } else res.status(400).json(`Payment Method ID ${id} does no exist in your address book`)
    
    } catch (error) {
        res.status(404).json('There are error')
    }
};

//Cpmfirm to the order
exports.confirmorder = async (req, res) => {    
    try {
        const confirm = req.body.confirm;
        const user = await db.Users.findOne({where:{email: req.user.email}});
        const order = await findOrder(user);
        if (order.address && order.paymentmethod && order.orderCost > 0) {
            if (confirm) {
                if (confirm == 'Yes' || confirm == 'yes') {
                    await db.Orders.update({statusorderId:2},
                                        {where:{userId:user.id,
                                                id:order.id}});
                    await db.Orders.create({    
                                            email:user.email,
                                            userId:user.id,
                                            statusorderId:1
                                            });
                    res.status(200).json('The order was confirmed, it will be shipped soon');
                    
                } else if (confirm == 'No' || confirm == 'no') res.status(400).json('Your order has not been confirmed')
                else  res.status(400).json('wrong confirmation answer, please can only be Yes or No');
            } else  res.status(400).json('Confirm Key does no exist');
        } else res.status(400).json('Your order was not completed, please check the payment method, address and products of the order.');
    } catch (error) {
        res.status(404).json('There are error');
    }
};

//Get all orders from the user.
exports.AllOrders = async (req, res) => {
    try {
        const user = await db.Users.findOne({
                                        where:{
                                            email:req.user.email
                                        }
                                    });
        const allOrders = await findAllorders(user);
        if (allOrders) {
            res.status(200).json(allOrders)
        } else res.status(400).json('There are no orders from you')
    } catch (error) {
        res.status(404).json('There are error')
    }
}
