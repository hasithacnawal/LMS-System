module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "books",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      stockCount: {
        type: DataTypes.INTEGER,
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      createrId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: "Book",
      sequelize,
      tableName: "books",
      timestamps: true,
    }
  );
  return Book;
};
