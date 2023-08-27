const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const data = require("./products.json");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("tiny"));

app.get("/api/odiwhaodiwajioedawjoi", (req, res, next) => {
  return res.status(200).json({
    message: "Successful",
    code: 200,
    data,
  });
});

app.listen(3001, () => {
  console.log("Server is starting on port http://localhost:3001");
});
