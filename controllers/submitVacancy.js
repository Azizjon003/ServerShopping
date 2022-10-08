const db = require("../configs/db");
const SubmitVacancy = db.submitVacancies;

const User = db.users;
const Vacancy = db.vacancies;
const vacancyCategories = db.vacancyCategories;

const getAll = async (req, res) => {
  try {
    const submitVacancy = await SubmitVacancy.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Vacancy,
          include: [
            {
              model: vacancyCategories,
            },
          ],
        },
      ],
    });

    res.status(200).json({
      data: submitVacancy,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add = async (req, res) => {
  try {
    const submitVacancy = await SubmitVacancy.create(req.body);
    res.status(200).json({
      data: submitVacancy,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete1 = async (req, res) => {
  try {
    await SubmitVacancy.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const submitVacancy = await SubmitVacancy.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: submitVacancy,
        },
        {
          model: Vacancy,
          include: [
            {
              model: vacancyCategories,
            },
          ],
        },
      ],
    });
    res.status(200).json({
      data: submitVacancy,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const update = async (req, res) => {
  try {
    const submitVacancy = await SubmitVacancy.findOne({
      where: { id: req.params.id },
    });

    submitVacancy.status = req.body.status || submitVacancy.status;
    submitVacancy.submitVacancyId =
      req.body.submitVacancyId || submitVacancy.submitVacancyId;
    submitVacancy.vacancyId = req.body.vacancyId || submitVacancy.vacancyId;

    const newSubmitVacancy = await submitVacancy.save();

    res.status(200).json({
      data: newSubmitVacancy,
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
