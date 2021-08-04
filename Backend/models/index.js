"use strict";

const fs = require("fs");
const path = require("path");

const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.Category = require("./category")(sequelize, DataTypes);
db.Role = require("./role")(sequelize, DataTypes);
db.Author = require("./author")(sequelize, DataTypes);

db.User = require("./user")(sequelize, DataTypes);
db.Book = require("./book")(sequelize, DataTypes);
db.Journal = require("./journal")(sequelize, DataTypes);

db.Book.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "Category",
});
db.Category.hasMany(db.Book);

db.Book.belongsTo(db.Author, {
  foreignKey: "authorId",
  as: "Author",
});
db.Author.hasMany(db.Book);

db.Journal.belongsTo(db.Category);
db.Category.hasMany(db.Journal);

db.Role.hasMany(db.User);
db.User.belongsTo(db.Role, {
  foreignKey: "roleId",
  as: "role",
});

db.User.hasMany(db.Journal);
db.Journal.belongsTo(db.User, {
  foreignKey: "createrId",
  as: "Creater",
});

module.exports = db;
