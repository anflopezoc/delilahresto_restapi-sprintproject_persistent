const db = require('../../DB/db')

exports.findOrder = async (user) => {
    return await db.Orders.findOne({
        where:{
            email: user.email,
            statusorderId:1
        },
        defaults:{
            email:user.email,
            userId:user.id,
            statusorderId:1
        },
        attributes: [
            'id',
            'orderCost'
            ],
        include: [
            {
                model:db.OrderProducts,
                attributes: ['productName', 'price','quantity','productId'],
            },
            {
                model:db.Users,
                attributes: ['name', 'email'],
            }, 
            {
                model:db.Addresses,
                attributes: ['address', 'city'],
            }, 
            {
                model:db.Payments,
                attributes: ['method'],
            },
            {
                model:db.Statusorders,
                attributes: ['statusName'],
            }
        ]
    })
};

exports.orderCostCalculator = async (OrderID) =>{
    const orderProduct = await db.OrderProducts.findAll({
                        where:{orderId:OrderID}
                        });
    const reduce = orderProduct.reduce((a,b) =>a+(b.price*b.quantity),0);
    await db.Orders.update({orderCost: reduce},
        {where:{id:OrderID}});
    const orderWithProducts = await db.Orders.findOne({
                                                    where:{id:OrderID},
                                                    attributes: [
                                                        'id',
                                                        'userId',
                                                        'email'
                                                        ],
                                                    include: [
                                                        {
                                                            model:db.OrderProducts,
                                                            attributes: ['productName', 'price','quantity','productId'],
                                                        } 
                                                    ]
                                                });
    return orderWithProducts
};

exports.findAllorders = async (user) => {
    return await db.Orders.findAll({
                                where:{userId:user.id},
                                attributes: [
                                    'id',
                                    'email',           
                                    'orderCost'
                                    ],
                                include: [
                                    {
                                        model:db.OrderProducts,
                                        attributes: ['productName', 'price','quantity','productId'],
                                    },
                                    {
                                        model:db.Payments,
                                        attributes: ['method'],
                                    },
                                    {
                                        model:db.Statusorders,
                                        attributes: ['statusName'],
                                    }
                                ]
                                })
}