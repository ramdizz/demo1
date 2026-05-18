const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = require("./User")(sequelize);
const Application = require("./Application")(sequelize);

// Связи
User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Application };
