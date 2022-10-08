const VacancyCategory = (sequelize, DataTypes) => {
  const VacancyCategory = sequelize.define("vacancyCategories", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  });
  return VacancyCategory;
};

module.exports = VacancyCategory;
