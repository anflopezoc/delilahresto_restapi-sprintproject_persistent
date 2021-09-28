module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderCost : {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },    
    });

    return order
}