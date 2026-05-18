import React from "react";
import ApplicationsList from "./ApplicationsList";
import "../App.css";

const AdminPanel = () => {
  // Администратор видит все заявки и может менять статус
  // Для смены статуса добавим простой селект
  const [statusChanges, setStatusChanges] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);

  const handleStatusChange = async (appId, newStatus) => {
    await fetch(`http://localhost:5000/api/applications/${appId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setRefresh((prev) => !prev);
  };

  // Передаём в ApplicationsList дополнительный проп для управления статусами
  // Но проще расширим ApplicationsList, чтобы для админа показывать выбор статуса.
  // Сделаем отдельную реализацию здесь, чтобы не усложнять общий компонент.
  const [apps, setApps] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:5000/api/applications/?admin=true")
      .then((res) => res.json())
      .then(setApps);
  }, [refresh]);

  return (
    <div>
      <h2>Панель администратора</h2>
      {apps.map((app) => (
        <div
          key={app.id}
          style={{ border: "1px solid gray", margin: 10, padding: 10 }}
        >
          <p>Курс: {app.courseName}</p>
          <p>Пользователь: {app.User?.fullName}</p>
          <p>Статус: {app.status}</p>
          <select
            onChange={(e) => handleStatusChange(app.id, e.target.value)}
            value={app.status}
          >
            <option>Новая</option>
            <option>Мероприятие назначено</option>
            <option>Мероприятие завершено</option>
          </select>
          <p>Отзыв: {app.review || "Нет отзыва"}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
