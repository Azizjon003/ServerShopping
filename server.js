const dotenv = require("dotenv").config({ path: "./config.env" });
const app = require("./middlewares/app");
const cli = require("cli-color");

const PORT = process.env.PORT || 8000;
require("./configs/db");

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
