("use strict");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        defaultValue: "assets/images/user/user1.jpg",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: "User",
      sequelize,
      tableName: "users",
      timestamps: true,
    }
  );
  return User;
};
