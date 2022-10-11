const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");

const Reviews = db.reviewService;

const getAll = catchAsync(async (req, res) => {
  const reviews = await Reviews.findAll();
  res.status(200).json({
    data: reviews,
    status: "succes",
  });
});

const add = catchAsync(async (req, res) => {
  req.body.userId = req.user.id;
  const reviews = await Reviews.create(req.body);
  res.status(200).json({
    data: reviews,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Reviews.destroy({ where: { id: req.params.id } });
  res.status(204).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  const loc = await Reviews.findOne({
    where: { id: req.params.id },
  });
  res.status(200).json({
    data: loc,
  });
});

module.exports = {
  add,
  getAll,
  delete1,
  getOne,
};
