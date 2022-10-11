const Workers = (sequelize, DataTypes) => {
  const Workers = sequelize.define("workers", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        max: 20,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        max: 20,
      },
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 5, max: 20 },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 5, max: 20 },
    },
    status: { type: DataTypes.INTEGER, allowNull: false },
    experience: { type: DataTypes.STRING, allowNull: false },
    review_id: {
      type: DataTypes.UUID,
      references: {
        model: "reviewsService",
        key: "id",
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "no-image.jpg",
    },
  });
  return Workers;
};

module.exports = Workers;
