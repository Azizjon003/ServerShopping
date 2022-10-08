const db = require("../configs/db");
const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");

const Review = db.reviews;
const User = db.users;

const getAll = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: db.users,
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
    });

    res.status(200).json({
      datas: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { rating, comment, productId } = req.body;
  if (!userId) {
    return next(new AppError("You are not logged in", 401));
  }
  const review = await Review.create({
    rating,
    comment,
    userId,
    productId,
  });
  res.status(200).json({
    data: review,
  });
});

const delete1 = async (req, res) => {
  try {
    await Review.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.users,
        },
      ],
    });
    res.status(200).json({
      data: review,
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
};
