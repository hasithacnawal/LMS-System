("use strict");
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "categories",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      modelName: "Category",
      sequelize,
      tableName: "categories",
      timeStamps: false,
    }
  );
  return Category;
};
