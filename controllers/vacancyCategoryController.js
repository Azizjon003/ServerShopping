const db = require("../configs/db");
const Vacancy = db.vacancies;
const VacancyCategory = db.vacancyCategories;

const getAll = async (req, res) => {
  try {
    const vacancyCategory = await VacancyCategory.findAll(); // required:true

    res.status(200).json({
      data: vacancyCategory,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add = async (req, res) => {
  try {
    const vacancyCategory = await VacancyCategory.create(req.body);
    res.status(200).json({
      data: vacancyCategory,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete1 = async (req, res) => {
  try {
    await VacancyCategory.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const vacancyCategory = await VacancyCategory.findOne({
      where: { id: req.params.id },
      include: { model: Vacancy },
    });
    res.status(200).json({
      data: vacancyCategory,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const update = async (req, res) => {
  try {
    const vacancyCategory = await VacancyCategory.findOne({
      where: { id: req.params.id },
    });

    console.log(vacancyCategory);

    vacancyCategory.name = req.body.name || vacancyCategory.name;

    const newVacancyCategory = await vacancyCategory.save();

    res.status(200).json({
      data: newVacancyCategory,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  add,
  getAll,
  delete1,
  getOne,
  update,
};
