const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Application", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["cash", "transfer"]],
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Новая",
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
