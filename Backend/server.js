const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const cors = require("cors");

const { sequelize } = require("./models");

//databse syncing
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.error("unable to connect db", err));

const app = express();

app.use(cors());
//public folder to show webpage running
app.use(express.static(path.join(__dirname, "public")));

//parse application/json form-urlencoded
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//api router imports
const roleRouter = require("./api/role");
const categoryRouter = require("./api/categories");
const authRouter = require("./api/auth");
const bookRouter = require("./api/book");
const journalRouter = require("./api/journal");

//API routes

app.use("/api/roles", roleRouter);
app.use("/api/category", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/journal", journalRouter);

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`server started on port ${port}`));
