const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const cli = require("cli-color");

const Product = db.products;

const getAll = catchAsync(async (req, res) => {
  const categories = await Product.findAll({
    include: [
      {
        model: db.productDetails,
        attributes: [
          "id",
          "name",
          "price",
          "description",
          "images",
          "colors",
          "condition",
        ],
      },
      {
        model: db.brands,
        attributes: ["id", "name", "photo"],
      },
      {
        model: db.categories,
        attributes: ["id", "name", "photo"],
      },
      {
        model: db.categoryLittles,
        attributes: ["id", "name", "photo"],
      },
      {
        model: db.reviews,
        attributes: ["id", "userId", "comment", "rating", "createdAt"],
      },
    ],
    attributes: ["id", "name", "image_main", "views", "createdAt", "updatedAt"],
  });
  res.status(200).json({
    data: categories,
    status: "succes",
  });
});

const add = catchAsync(async (req, res) => {
  console.log(req.body);
  console.log("adbukjasbdjkasbdvasj");
  console.log(req.file);
  req.body.image_main =
    "http://localhost:8000/images/" + req.file.filename || "no-image.jpg";
  const categories = await Product.create(req.body);
  res.status(200).json({
    data: categories,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.status(204).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  const upt = await Product.update(
    {
      views: db.sequelize.literal("views + 1"),
    },
    {
      where: { id: req.params.id },
    }
  );
  const loc = await Product.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.productDetails,
        attributes: [
          "id",
          "name",
          "price",
          "description",
          "images",
          "colors",
          "condition",
        ],
      },
      {
        model: db.brands,
        attributes: ["id", "name", "photo"],
      },
      {
        model: db.categories,
        attributes: ["id", "name", "photo"],
      },
      {
        model: db.categoryLittles,
        attributes: ["id", "name", "photo"],
      },
      {
        model: db.reviews,
        attributes: ["id", "userId", "comment", "rating", "createdAt"],
      },
    ],
    attributes: ["id", "name", "image_main", "views", "createdAt", "updatedAt"],
  });
  res.status(200).json({
    data: loc,
  });
});
const update = async (req, res) => {
  const loc = await Product.findOne({ where: { id: req.params.id } });

  let name = req.body.name || loc.name;
  const photo =
    "http://localhost:8000/images/" + req.file.filename || loc.photo;
  const newLocation = await Product.update(
    { name, photo },
    { where: { id: req.params.id } }
  );

  console.log(newLocation);
  const newCategory = await Product.findOne({
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
