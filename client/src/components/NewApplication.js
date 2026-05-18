import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../App.css";

const NewApplication = ({ userId }) => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/applications", {
        userId,
        courseName,
        startDate,
        paymentMethod,
      });
      navigate("/applications");
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка");
    }
  };

  return (
    <div>
      <h2>Новая заявка на курс</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Нужное помещение"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Наличными</option>
            <option value="transfer">Перевод по номеру телефона</option>
          </select>
        </div>
        <button type="submit">Отправить заявку</button>
      </form>
    </div>
  );
};

export default NewApplication;
