import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ApplicationsList from "./components/ApplicationsList";
import NewApplication from "./components/NewApplication";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!user) {
    return (
      <BrowserRouter>
        <div style={{ padding: 20 }}>
          <Routes>
            <Route
              path="/register"
              element={<Register onLogin={handleLogin} />}
            />
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h2>Добро пожаловать, {user.fullName}!</h2>
        <nav style={{ marginBottom: 20 }}>
          {!user.isAdmin ? (
            <>
              <Link to="/applications" style={{ marginRight: 10 }}>
                Мои заявки
              </Link>
              <Link to="/new-application" style={{ marginRight: 10 }}>
                Новая заявка
              </Link>
            </>
          ) : (
            <Link to="/admin" style={{ marginRight: 10 }}>
              Панель администратора
            </Link>
          )}
          <button onClick={handleLogout}>Выйти</button>
        </nav>
        <Routes>
          {!user.isAdmin ? (
            <>
              <Route
                path="/applications"
                element={<ApplicationsList userId={user.id} isAdmin={false} />}
              />
              <Route
                path="/new-application"
                element={<NewApplication userId={user.id} />}
              />
              <Route path="*" element={<Navigate to="/applications" />} />
            </>
          ) : (
            <>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
