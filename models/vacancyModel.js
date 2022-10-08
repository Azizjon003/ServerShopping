const Vacancy = (sequelize, DataTypes) => {
  const Vacancy = sequelize.define("vacancies", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  });
  return Vacancy;
};
module.exports = Vacancy;
