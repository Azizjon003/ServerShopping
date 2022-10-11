const db = require("../configs/db");
const catchAsync = require("../utility/catchAsync");
const Location = db.locations;
const User = db.users;

const add = catchAsync(async (req, res) => {
  req.body.userId = req.user.id;
  const user = await Location.create(req.body);
  res.status(200).json({
    data: user,
    status: "succes",
  });
});

const delete1 = catchAsync(async (req, res) => {
  await Location.destroy({ where: { id: req.params.id } });
  res.status(200).json({
    data: "success",
  });
});
const getOne = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const loc = await Location.findOne({
      where: { id: req.params.id, userId },
    });
    res.status(200).json({
      data: loc,
    });
  } catch (error) {
    console.log(error.message);
  }
});
const update = catchAsync(async (req, res) => {
  try {
    const loc = await Location.findOne({ where: { id: req.params.id } });

    loc.country = req.body.country || loc.country;
    loc.city = req.body.city || loc.city;
    loc.district = req.body.district || loc.district;
    loc.street = req.body.street || loc.street;
    loc.home = req.body.home || loc.home;

    const newLocation = await loc.save();

    console.log(newLocation);

    res.status(200).json({
      data: newLocation,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = {
  add,
  delete1,
  getOne,
  update,
};
