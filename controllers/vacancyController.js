const db = require("../configs/db");
const Vacancy = db.vacancies;
const VacancyCategory = db.vacancyCategories;

const getAll = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll({ include: VacancyCategory }); // required:true

    res.status(200).json({
      data: vacancies,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add = async (req, res) => {
  try {
    const vacancy = await Vacancy.create(req.body);
    res.status(200).json({
      data: vacancy,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete1 = async (req, res) => {
  try {
    await Vacancy.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const vacancy = await Vacancy.findOne({
      where: { id: req.params.id },
      include: { model: VacancyCategory },
    });
    res.status(200).json({
      data: vacancy,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const update = async (req, res) => {
  try {
    const vacancy = await Vacancy.findOne({ where: { id: req.params.id } });

    vacancy.title = req.body.title || vacancy.title;
    vacancy.description = req.body.description || vacancy.description;
    vacancy.vacancyCategoryId =
      req.body.vacancyCategoryId || vacancy.vacancyCategoryId;

    const newVacancy = await vacancy.save();

    res.status(200).json({
      data: newVacancy,
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
