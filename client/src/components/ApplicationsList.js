import React, { useState, useEffect } from "react";
import api from "../api";
import "../App.css";
import ImageSlider from "./ImageSlider"; // импортируем слайдер

const ApplicationsList = ({ userId, isAdmin }) => {
  const [apps, setApps] = useState([]);
  const [reviewText, setReviewText] = useState({});
  const [reviewError, setReviewError] = useState({});

  const fetchApps = async () => {
    const url = isAdmin ? `/?admin=true` : `/?userId=${userId}`;
    const res = await api.get("/applications" + url);
    setApps(res.data);
  };

  useEffect(() => {
    fetchApps();
  }, [userId, isAdmin]);

  const handleReviewChange = (appId, text) => {
    setReviewText({ ...reviewText, [appId]: text });
  };

  const submitReview = async (appId) => {
    try {
      await api.put(`/applications/${appId}/review`, {
        userId,
        review: reviewText[appId],
      });
      setReviewError({ ...reviewError, [appId]: "" });
      fetchApps();
    } catch (err) {
      const msg = err.response?.data?.error || "Ошибка сохранения отзыва";
      setReviewError({ ...reviewError, [appId]: msg });
    }
  };

  return (
    <div>
      <h2>{isAdmin ? "Все заявки" : "Мои заявки"}</h2>

      {/* Показываем слайдер только обычным пользователям */}
      {!isAdmin && <ImageSlider />}

      {apps.map((app) => (
        <div
          key={app.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p>
            <strong>Курс:</strong> {app.courseName}
          </p>
          <p>
            <strong>Дата начала:</strong> {app.startDate}
          </p>
          <p>
            <strong>Способ оплаты:</strong>{" "}
            {app.paymentMethod === "cash" ? "Наличные" : "Перевод"}
          </p>
          <p>
            <strong>Статус:</strong> {app.status}
          </p>

          {!isAdmin && (
            <>
              <p>
                <strong>Отзыв:</strong> {app.review || "Нет отзыва"}
              </p>
              {app.status === "Обучение завершено" ? (
                <div>
                  <textarea
                    placeholder="Ваш отзыв о качестве образовательных услуг"
                    rows="3"
                    cols="50"
                    value={reviewText[app.id] || ""}
                    onChange={(e) => handleReviewChange(app.id, e.target.value)}
                  />
                  <br />
                  <button onClick={() => submitReview(app.id)}>
                    Сохранить отзыв
                  </button>
                  {reviewError[app.id] && (
                    <p style={{ color: "red" }}>{reviewError[app.id]}</p>
                  )}
                </div>
              ) : (
                <p style={{ color: "gray", fontStyle: "italic" }}>
                  Отзыв можно будет оставить после завершения обучения.
                </p>
              )}
            </>
          )}

          {isAdmin && app.User && (
            <p>
              <strong>Пользователь:</strong> {app.User.fullName}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicationsList;
