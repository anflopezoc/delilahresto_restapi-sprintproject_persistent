module.exports = (Sequelize, DataTypes) => {
    const Stateorder = Sequelize.define('stateorder', {
        stateName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return Stateorder
}
