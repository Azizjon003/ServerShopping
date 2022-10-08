const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const cli = require("cli-color");

const Brands = db.brands;

const getAll = catchAsync(async (req, res) => {
  const views = await Brands.findAll({}); // required:true
  res.status(200).json({
    data: views,
    status: "succes",
  });
});

const add = catchAsync(async (req, res) => {
  const views = await Brands.create(req.body);
  res.status(200).json({
    data: views,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Brands.destroy({ where: { id: req.params.id } });
  res.status(204).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  const loc = await Brands.findOne({
    where: { id: req.params.id },
  });
  res.status(200).json({
    data: loc,
  });
});
const update = async (req, res) => {
  const loc = await Views.findOne({ where: { id: req.params.id } });

  let name = req.body.name || loc.name;
  let photo = req.body.photo || loc.photo;

  const newLocation = await Views.update(
    { name, photo },
    { where: { id: req.params.id } }
  );

  console.log(newLocation);
  const newCategory = await Views.findOne({
    where: { id: req.params.id },
  });
  res.status(200).json({
    data: newCategory,
  });
};

module.exports = {
  add,
  getAll,
  delete1,
  getOne,
  update,
};
