const Services = (sequelize, DataTypes) => {
  const Services = sequelize.define("services", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    serviceTypesId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "serviseTypes",
        key: "id",
      },
    }, //boshqa table
  });
  return Services;
};

module.exports = Services;
