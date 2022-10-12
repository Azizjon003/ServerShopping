const dotenv = require("dotenv").config({ path: "./config.env" });
const swaggerUi = require("swagger-ui-express");
const app = require("./middlewares/app");
const cli = require("cli-color");
const specs = require("./utility/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const PORT = process.env.PORT || 8000;
require("./configs/db");

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
