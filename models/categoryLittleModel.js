const categoryLittle = (sequelize, DataTypes) => {
  const categoryLittle = sequelize.define(
    "categoryLittles",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      tableName: "categoryLittles",
    }
  );
  return categoryLittle;
};

module.exports = categoryLittle;
