const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const cli = require("cli-color");
const { upload } = require("../utility/upload");

const Service = db.services;

const getAll = catchAsync(async (req, res) => {
  const service = await Service.findAll({
    include: [
      {
        model: db.serviseTypes,
      },
    ],
  });
  res.status(200).json({
    data: service,
    status: "succes",
  });
});

const add = catchAsync(async (req, res) => {
  console.log(req.body);
  req.body.photo =
    "http://localhost:8000/images/" + req.file.filename || "no-image.jpg";
  const service = await Service.create(req.body);
  res.status(200).json({
    data: service,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Service.destroy({ where: { id: req.params.id } });
  res.status(200).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  const loc = await Service.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.serviseTypes,
      },
    ],
  });
  res.status(200).json({
    data: loc,
  });
});
const update = async (req, res) => {
  const loc = await Service.findOne({ where: { id: req.params.id } });

  let name = req.body.name || loc.name;
  let photo = "http://localhost:8000/images/" + req.file.filename || loc.photo;

  const newLocation = await Service.update(
    { photo, name },
    { where: { id: req.params.id } }
  );

  console.log(newLocation);
  const newCategory = await Service.findOne({
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
  delete1,
};
