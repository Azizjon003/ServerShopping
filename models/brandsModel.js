const Brands = (sequelize, DataTypes) => {
  const Brands = sequelize.define("brands", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 3,
        max: 20,
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Brands;
};

module.exports = Brands;
