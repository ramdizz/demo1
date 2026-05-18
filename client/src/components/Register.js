import React, { cloneElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "../App.css";

const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    password: "",
    fullName: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      // после регистрации сразу логиним
      const res = await api.post("/auth/login", {
        login: form.login,
        password: form.password,
      });
      onLogin(res.data);
      navigate("/applications");
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка регистрации");
    }
  };

  return (
    <div className={"authorisationForm"}>
      <h2>Регистрация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="login"
            placeholder="Логин (латиница, цифры, ≥6)"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Пароль (≥8)"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="fullName"
            placeholder="ФИО (кириллица, пробелы)"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Телефон 8(XXX)XXX-XX-XX"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Создать пользователя</button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
