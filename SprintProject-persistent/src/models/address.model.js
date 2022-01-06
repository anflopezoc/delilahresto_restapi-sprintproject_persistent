module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('address', {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
    return Address
}