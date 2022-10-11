const ServiseTypes = (sequelize, DataTypes) => {
  const ServiseTypes = sequelize.define("serviseTypes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    review_id: {
      type: DataTypes.UUID,
      references: {
        model: "reviewsService",
        key: "id",
      },
    },
    worker_id: {
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
  });
  return ServiseTypes;
};

module.exports = ServiseTypes;
