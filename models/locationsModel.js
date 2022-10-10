const Locations = (sequelize, DataTypes) => {
  const Locations = sequelize.define("locations", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 20,
      },
      lowercase: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        max: 20,
      },
      lowercase: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    home: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Locations;
};

module.exports = Locations;
