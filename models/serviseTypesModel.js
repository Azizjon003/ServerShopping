const ServiseTypes = (sequelize, DataTypes) => {
  const ServiseTypes = sequelize.define("serviseTypes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    review_id: { type: DataTypes.STRING, allowNull: false }, // boshqa table
    worker_id: { type: DataTypes.STRING, allowNull: false }, // boshqa table
  });
  return ServiseTypes;
};

module.exports = ServiseTypes;
