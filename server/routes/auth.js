const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Регистрация
router.post("/register", async (req, res) => {
  try {
    const { login, password, fullName, phone, email } = req.body;
    // Проверки на стороне сервера
    if (!login || !password || !fullName || !phone || !email) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }
    const existing = await User.findOne({ where: { login } });
    if (existing) return res.status(400).json({ error: "Логин уже занят" });

    const user = await User.create({ login, password, fullName, phone, email });
    res.json({ id: user.id, login: user.login, fullName: user.fullName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Логин
router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  // Администратор
  if (login === "Admin26" && password === "Demo20") {
    return res.json({
      id: null,
      login: "Admin",
      fullName: "Administrator",
      isAdmin: true,
    });
  }
  // Обычный пользователь
  const user = await User.findOne({ where: { login, password } });
  if (!user)
    return res.status(401).json({ error: "Неверный логин или пароль" });
  res.json({
    id: user.id,
    login: user.login,
    fullName: user.fullName,
    isAdmin: false,
  });
});

module.exports = router;
