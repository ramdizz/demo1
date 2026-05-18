const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const appRoutes = require("./routes/applications");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", appRoutes);

const PORT = 5000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
});
