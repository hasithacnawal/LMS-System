module.exports = (sequelize, DataTypes) => {
  const Journal = sequelize.define(
    "journals",
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
      file: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      createrId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: "Journal",
      sequelize,
      tableName: "journals",
      timestamps: true,
    }
  );
  return Journal;
};
