const ServiseTypes = (sequelize, DataTypes) => {
  const ServiseTypes = sequelize.define("serviseTypes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    workerId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "workers",
        key: "id",
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "no-photo.jpg",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "services",
        key: "id",
      },
    },
  });
  return ServiseTypes;
};

module.exports = ServiseTypes;
