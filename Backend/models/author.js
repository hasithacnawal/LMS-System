("use strict");
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "authors",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqueValue: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: "Author",
      sequelize,
      tableName: "authors",
      timestamps: true,
    }
  );
  return Author;
};
