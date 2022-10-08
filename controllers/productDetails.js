const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const cli = require("cli-color");

const Details = db.productDetails;

const getAll = catchAsync(async (req, res) => {
  const details = await Details.findAll({
    include: [
      {
        model: db.products,
        as: "product",
      },
    ],
  }); // required:true
  res.status(200).json({
    data: details,
    status: "succes",
  });
});

const add = catchAsync(async (req, res) => {
  console.log(req.body);
  const details = await Details.create(req.body);
  res.status(200).json({
    data: details,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Details.destroy({ where: { id: req.params.id } });
  res.status(200).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  const loc = await Details.findOne({
    where: { id: req.params.id },
  });
  res.status(200).json({
    data: loc,
  });
});
const update = async (req, res) => {
  const loc = await Details.findOne({ where: { id: req.params.id } });

  let name = req.body.name || loc.name;
  let images = req.body.images || loc.images;
  let price = req.body.price * 1 || loc.price;
  let description = req.body.description || loc.description;
  let colors = req.body.colors || loc.colors;
  let condition = req.body.condition || loc.condition;

  const newLocation = await Details.update(
    { name, images, price, description, colors, condition },
    { where: { id: req.params.id } }
  );

  console.log(newLocation);
  const newCategory = await Details.findOne({
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
