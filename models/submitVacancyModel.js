const SubmitVacancy = (sequelize, DataTypes) => {
  const SubmitVacancy = sequelize.define("submitVacancies", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: "1" },
  });
  return SubmitVacancy;
};

module.exports = SubmitVacancy;
