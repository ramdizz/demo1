const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9]{6,}$/, // латиница и цифры, минимум 6
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[А-Яа-яЁё\s]+$/, // кириллица и пробелы
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  });
};
