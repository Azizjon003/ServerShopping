const db = require("../configs/db");
const Location = db.locations;
const User = db.users;

const getAll = async (req, res) => {
  try {
    const locations = await Location.findAll(); // required:true
    res.status(200).json({
      data: locations,
      status: "succes",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add = async (req, res) => {
  try {
    console.log(req.body);
    const user = await Location.create(req.body);
    res.status(200).json({
      data: user,
      status: "succes",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete1 = async (req, res) => {
  try {
    await Location.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const loc = await Location.findOne({ where: { id: req.params.id } });
    res.status(200).json({
      data: loc,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const update = async (req, res) => {
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
};

module.exports = {
  add,
  getAll,
  delete1,
  getOne,
  update,
};
