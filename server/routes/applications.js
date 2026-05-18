const express = require("express");
const router = express.Router();
const { Application, User } = require("../models");

// Получить заявки (если передан admin=true – все, иначе по userId)
router.get("/", async (req, res) => {
  const { userId, admin } = req.query;
  try {
    if (admin === "true") {
      const apps = await Application.findAll({ include: User });
      return res.json(apps);
    } else if (userId) {
      const apps = await Application.findAll({ where: { userId } });
      return res.json(apps);
    } else {
      return res.status(400).json({ error: "Не указан userId или admin" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать заявку
router.post("/", async (req, res) => {
  const { userId, courseName, startDate, paymentMethod } = req.body;
  if (!userId || !courseName || !startDate || !paymentMethod) {
    return res.status(400).json({ error: "Заполните все поля" });
  }
  try {
    const app = await Application.create({
      userId,
      courseName,
      startDate,
      paymentMethod,
      status: "Новая",
    });
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Добавить/изменить отзыв (только владелец)
router.put("/:id/review", async (req, res) => {
  const { id } = req.params;
  const { userId, review } = req.body;
  const app = await Application.findByPk(id);
  if (!app) return res.status(404).json({ error: "Заявка не найдена" });
  if (app.userId !== userId) return res.status(403).json({ error: "Нет прав" });
  app.review = review;
  await app.save();
  res.json(app);
});

// Изменить статус (только админ)
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const app = await Application.findByPk(id);
  if (!app) return res.status(404).json({ error: "Заявка не найдена" });
  app.status = status;
  await app.save();
  res.json(app);
});

// Добавить/изменить отзыв (только владелец и только при статусе "Обучение завершено")
router.put("/:id/review", async (req, res) => {
  const { id } = req.params;
  const { userId, review } = req.body;
  const app = await Application.findByPk(id);
  if (!app) return res.status(404).json({ error: "Заявка не найдена" });
  if (app.userId !== userId) return res.status(403).json({ error: "Нет прав" });

  // Проверяем статус
  if (app.status !== "Обучение завершено") {
    return res
      .status(400)
      .json({ error: "Отзыв можно оставить только после завершения обучения" });
  }

  app.review = review;
  await app.save();
  res.json(app);
});

module.exports = router;
