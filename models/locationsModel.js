const Locations = (sequelize, DataTypes) => {
  const Locations = sequelize.define("locations", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    home: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Locations;
};

module.exports = Locations;
