const { Sequelize, DataTypes, Op } = require("sequelize");
const cli = require("cli-color");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { dialect: "postgres", host: process.env.DB_HOST }
);
sequelize
  .authenticate()
  .then(() => {
    console.log(cli.blue("Postgresql connected succesfully"));
  })
  .catch((err) => {
    console.log(cli.red(err.message));
  });

let db = {};
db.sequelize = sequelize;
db.Op = Op;

db.brands = require("../models/brandsModel")(sequelize, DataTypes);

db.categories = require("../models/categoriesModel")(sequelize, DataTypes);

db.locations = require("../models/locationsModel")(sequelize, DataTypes);

db.productDetails = require("../models/productDetailsModel")(
  sequelize,
  DataTypes
);

db.reviews = require("../models/reviewsModel")(sequelize, DataTypes);

db.users = require("../models/userModel")(sequelize, DataTypes);

db.categoryLittles = require("../models/categoryLittleModel")(
  sequelize,
  DataTypes
);
// db.views = require("../models/views")(sequelize, DataTypes);

db.products = require("../models/productsModel")(sequelize, DataTypes);

db.likes = require("../models/likesProduct")(sequelize, DataTypes);
//

db.worker = require("../models/workersModel")(sequelize, DataTypes);

db.services = require("../models/servicesModel")(sequelize, DataTypes);

db.serviseTypes = require("../models/serviceTypesModel")(sequelize, DataTypes);
db.reviewService = require("../models/reviewsService.js")(sequelize, DataTypes);
// users bilan commentlar  qo'shilishi
db.users.hasOne(db.reviews, { onDelete: "CASCADE" });
db.reviews.belongsTo(db.users, { onDelete: "CASCADE" });
// users bilan commentlar qo'shilishi

//

// userlarning elonlari qo'shilishi

// userlarning  elonlari qo'shilishi

//

//

//

db.locations.hasOne(db.users, { onDelete: "CASCADE" });
db.users.belongsTo(db.locations, { onDelete: "CASCADE" });

//

//

//

//

db.categories.hasMany(db.categoryLittles);
db.categoryLittles.belongsTo(db.categories);
// db.categories.hasMany(db.products);
db.categoryLittles.hasMany(db.products);

//

// db.productDetails.hasOne(db.products);
// db.reviews.belongsTo(db.products);
//
db.products.belongsTo(db.productDetails);
// db.productDetails.belongsTo(db.products);
// db.productDetails.belongsTo(db.products);s
// db.products.hasOne(db.sales);
// db.products.hasMany(db.reviews);
db.products.belongsTo(db.brands);
db.brands.hasMany(db.products);
db.products.belongsTo(db.categories);
db.products.belongsTo(db.categoryLittles);
db.reviews.belongsTo(db.products);
db.products.hasMany(db.reviews);
db.likes.belongsTo(db.products);
db.users.hasMany(db.likes);
db.products.hasOne(db.locations);

db.serviseTypes.belongsTo(db.services);
db.serviseTypes.belongsTo(db.worker);
db.reviewService.belongsTo(db.users);
db.reviewService.belongsTo(db.serviseTypes);
db.services.hasMany(db.serviseTypes);
// db.reviewService.hasMany(db.users);
db.reviewService.belongsTo(db.worker);
db.serviseTypes.belongsTo(db.worker);

// db.products.belongsTo(db.likes);
// db.users.hasMany(db.likes);
// force: true, alter: true
// db.sequelize
//   .sync({ force: true, alter: true })
//   .then(() => {
//     console.log(cli.blue("Database & tables created!"));
//   })
//   .catch((err) => {
//     console.log(cli.red(err.message));
//   });

module.exports = db;
