const ProductDetails = (sequelize, DataTypes) => {
  const ProductDetails = sequelize.define("productDetails", {
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
        max: 250,
      },
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    colors: {
      type: DataTypes.ENUM,
      defaultValue: "black",
      values: ["white", "black", "gray"],
    },
    condition: { type: DataTypes.STRING, allowNull: false },
    images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  });
  return ProductDetails;
};

module.exports = ProductDetails;
