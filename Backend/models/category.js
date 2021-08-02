("use strict");
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "categories",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
