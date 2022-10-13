const Services = (sequelize, DataTypes) => {
  const Services = sequelize.define("services", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "no-photo.jpg",
    },
  });
  return Services;
};

module.exports = Services;
