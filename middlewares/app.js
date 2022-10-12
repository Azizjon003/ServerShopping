const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const parser = require("cookie-parser");
const errorHandler = require("../controllers/errorHandler");
app.use(express.json());
app.use(morgan("dev"));
app.use(parser());

const locationRouter = require("../routes/locationRouter");
const userRouter = require("../routes/userRouter");
const review = require("../routes/reviewRouter");
const categoryRouter = require("../routes/categoryRouter");
const littleCategory = require("../routes/littleCategory");
const brandsModel = require("../routes/brandRoutes");
const auth = require("../routes/authRouter");
const details = require("../routes/detailsRoute");
const product = require("../routes/productRoute");
const likeRoute = require("../routes/likeRoute");
const serviceRouter = require("../routes/serviceRoute");
const serviceTypeRouter = require("../routes/serviceTypeRoute");
const reviewServiceRouter = require("../routes/reviewServiceRoute");
const worker = require("../routes/workerRoute");


app.use(express.static(path.join(__dirname, "../public")));
app.use("/", auth);
app.use("/api/v1/like", likeRoute);
app.use("/api/v1/product", product);
auth.use("/api/v1/details", details);
app.use("/api/v1/brands", brandsModel);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/littleCategory", littleCategory);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", review);

app.use(errorHandler);

module.exports = app;
