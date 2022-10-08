const Sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define("sales", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    discount: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
  });
  return Sales;
};

module.exports = Sales;
