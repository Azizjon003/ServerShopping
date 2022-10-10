const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const cli = require("cli-color");

const Likes = db.likes;

const getAll = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const likesProduct = await Likes.findAll({
    where: { userId },
    include: [
      {
        model: db.products,
        attributes: ["id", "name", "image_main", "views", "createdAt", "price"],
      },
    ],
  }); // required:true
  res.status(200).json({
    data: likesProduct,
    status: "succes",
  });
});

const add = catchAsync(async (req, res, next) => {
  console.log(cli.red("e kalasdnkasd"));
  const { productId } = req.body;
  const userId = req.user.id;
  console.log(cli.blue(productId, userId));
  const categories = await Likes.create({
    userId,
    productId,
  });
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
  const loc = await Likes.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.products,
      },
    ],
  });
  res.status(200).json({
    data: loc,
  });
});
const update = async (req, res) => {
  const loc = await Likes.findOne({ where: { id: req.params.id } });

  let userId = req.user.id || loc.userId;
  let productId = req.body.productId || loc.productId;

  const newLocation = await Likes.update(
    { userId, productId },
    { where: { id: req.params.id } }
  );

  console.log(newLocation);
  const newCategory = await Likes.findOne({
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
