module.exports = (Sequelize, DataTypes) => {
    const Statusorder = Sequelize.define('statusorder', {
        statusName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return Statusorder
}
