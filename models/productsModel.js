const { UUID } = require("sequelize");

const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 250,
      },
    },
    image_main: { type: DataTypes.STRING, allowNull: false },
    saleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "sales",
        key: "id",
      },
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }, //boshqa table

    productDetailId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "productDetails",
        key: "id",
      },
    }, //boshqa table
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    categoryLittleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categoryLittles",
        key: "id",
      },
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "brands",
        key: "id",
      },
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
  return Products;
};

module.exports = Products;
