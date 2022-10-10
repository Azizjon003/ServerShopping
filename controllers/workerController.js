const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const Worker = db.worker;

const getAll = catchAsync(async (req, res, next) => {
  const workers = await Worker.findAll({});
  res.status(200).json({
    data: workers,
    status: "succes",
  });
});
const add = catchAsync(async (req, res, next) => {
  const worker = await Worker.create(req.body);
  res.status(200).json({
    data: worker,
  });
});
const getOne = catchAsync(async (req, res, next) => {
  const worker = await Worker.findOne({
    id: req.params.id,
  });
  res.status(200).json({
    data: worker,
    status: "succes",
  });
});
const update = catchAsync(async (req, res, next) => {
  const workers = await Worker.findOne({ where: { id: req.params.id } });
  const first_name = req.body.first_name || workers.first_name;
  const last_name = req.body.last_name || workers.last_name;
  const middle_name = req.body.middle_name || workers.middle_name;
  const phone = req.body.phone || workers.phone;
  const status = req.body.status || workers.status;

  const worker = await Worker.update({}, { where: { id: req.params.id } });
});
