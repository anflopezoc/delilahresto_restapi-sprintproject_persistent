module.exports = (sequelize, DataTypes) => {
    const orderProduct = sequelize.define('orderproduct', {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    })
    return orderProduct
}