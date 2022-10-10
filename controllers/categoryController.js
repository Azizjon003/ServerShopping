const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const cli = require("cli-color");
const { upload } = require("../utility/upload");

const Category = db.categories;

const getAll = catchAsync(async (req, res) => {
  const categories = await Category.findAll({
    include: [
      {
        model: db.categoryLittles,
        as: "categoryLittles",
      },
    ],
  }); // required:true
  res.status(200).json({
    data: categories,
    status: "succes",
  });
});

const add = catchAsync(async (req, res) => {
  console.log(req.body);
  req.body.photo =
    "http://localhost:8000/images/" + req.file.filename || "no-image.jpg";
  const categories = await Category.create(req.body);
  res.status(200).json({
    data: categories,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Category.destroy({ where: { id: req.params.id } });
  res.status(200).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  const loc = await Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.categoryLittles,
        as: "categoryLittles",
      },
    ],
  });
  res.status(200).json({
    data: loc,
  });
});
const update = async (req, res) => {
  const loc = await Category.findOne({ where: { id: req.params.id } });

  let name = req.body.name || loc.name;
  let photo = "http://localhost:8000/images/" + req.file.filename || loc.photo;

  const newLocation = await Category.update(
    { photo, name },
    { where: { id: req.params.id } }
  );

  console.log(newLocation);
  const newCategory = await Category.findOne({
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
