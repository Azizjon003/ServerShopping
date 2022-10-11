const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../configs/db");
const ServiseType = db.serviseTypes;

const getAll = catchAsync(async (req, res, next) => {
  const type = await ServiseType.findAll({});
  res.status(200).json({
    data: type,
    status: "succes",
  });
});
const add = catchAsync(async (req, res, next) => {
  const type = await ServiseType.create(req.body);
  res.status(200).json({
    data: type,
  });
});
const getOne = catchAsync(async (req, res, next) => {
  const type = await ServiseType.findOne({
    id: req.params.id,
  });
  res.status(200).json({
    data: type,
    status: "succes",
  });
});
const update = catchAsync(async (req, res, next) => {
  const workers = await ServiseType.findOne({ where: { id: req.params.id } });
  const name = req.body.name || workers.name;
  const description = req.body.description || workers.description;
  const serviceId = req.body.serviceId || workers.serviceId;
  const workerId = req.body.workerId || workers.workerId;

  const worker = await Worker.update(
    {
      name,
      description,
      serviceId,
      workerId,
    },
    { where: { id: req.params.id } }
  );
  res.status(200).json({
    data: worker,
    status: "succes",
  });
});

const delete1 = async (req, res) => {
  try {
    await ServiseType.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  add,
  getAll,
  getOne,
  update,
  delete1,
};
