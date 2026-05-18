import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../App.css";

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { login, password });
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка входа");
    }
  };

  return (
    <div className={"authorisationForm"}>
      <h2>Авторизация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Еще не зарегистрированы? <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
};

export default Login;
