const likes = (sequelize, DataTypes) => {
  const likes = sequelize.define("likes", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      refenrences: {
        model: "products",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  });
  return likes;
};

module.exports = likes;
