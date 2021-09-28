module.exports = (sequelize, DataTypes) => {
    const method = sequelize.define('paymentmethod', {
        method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
    return method
}