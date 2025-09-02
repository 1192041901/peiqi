import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
function nav() {
  const list = [
    {
      name: "首页",
      path: "/",
      icon: "🏠",
      id: 1,
    },
    {
      name: "纪念日",
      path: "/commemorative",
      icon: "📅",
      id: 2,
    },
    {
      name: "相册",
      path: "/album",
      icon: "📷",
      id: 3,
    },

    {
      name: "猪窝",
      path: "/user",
      icon: "👤",
      id: 4,
    },
  ];
  const location = useLocation();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const active = list.find((item) => item.path == location.pathname);
    setActive(active);
  }, [location]);
  return (
    <div className={styles.nav}>
      {list.map((item) => (
        <div
          className={`${styles.item} ${
            active.id === item.id ? styles.active : ""
          }`}
          key={item.id}
          onClick={() => {
            navigate(item.path);
          }}
        >
          <div className={styles.icon}>{item.icon}</div>
          <div className={styles.name}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}

export default nav;
