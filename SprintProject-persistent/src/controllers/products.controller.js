const db = require('../DB/db');
const {client} = require('../middlewares/redis.middleware')

exports.getproducts = async (req, res) => {
    const products = await db.Products.findAll({
                                                where:{
                                                    isActive:true
                                                    }
                                                });
    client.setex('Products', 5*60, JSON.stringify(products));
    res.status(200).json(products)
};

exports.newproduct = async (req, res) => {
    try {
        const {productName,price} = req.body;
        const product = await db.Products.findOne({where:{productName}})
        if (product) res.status(400).json('The product already exists')            
        else {
            if (productName&&price) {
                const newproduct = await db.Products.create({productName, price});
                client.del('Products');
                res.status(200).json(newproduct)
            } else res.status(400).json('productName or price does not exist')  
        }
    } catch (err) {
        res.status(404).json(err)
    }
};

exports.productUpdate = async (req, res) => {
 try {
     const id = parseInt(req.params.id);
     const product = await db.Products.findOne({
                                                where:{
                                                        id
                                                        }
                                                    });
     if (product) {
         const {productName, price} = req.body;
         if (productName && price) {
              await db.Products.update({productName,price},
                {where:{id}});
            client.del('Products');
            res.status(200).json(`Product with ID ${id} has been updated`)
         } else res.status(400).json('productName or price does not exist')  
     } else res.status(400).json(`Product with ID ${id} does not existe`)
 } catch (err) {
     res.status(404).json(err)
 }
};

exports.inactiveproduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await db.Products.findOne({where:{id}});
        if (product) {
            if (product.isActive == false) res.status(400).json(`Product ID ${id} was already inactivated`)
            else {
                const productUpdate = await db.Products.update({isActive:false},
                       {where:{id}});
                client.del('Products');
                res.status(200).json(`Product with ID ${id} has been inactived`)
            }
        } else res.status(400).json(`Product with ID ${id} does not existe`)
    } catch (err) {
        res.status(404).json(err)
    }
}
