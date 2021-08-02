("use strict");
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "roles",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "Role",
      sequelize,
      tableName: "roles",
      timeStamps: false,
    }
  );
  return Role;
};
