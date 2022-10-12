const swaggerDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Computer Service API Documentation @ziz",
      version: "1.0.0",
      description: "The API documentation for Computer Service ",
    },
    servers: [{ url: "http://localhost:8000" }],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerDoc(options);

module.exports = specs;
