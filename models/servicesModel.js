const Services = (sequelize, DataTypes) => {
  const Services = sequelize.define("services", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    service_types_id: { type: DataTypes.STRING, allowNull: false }, //boshqa table
  });
  return Services;
};

module.exports = Services;
