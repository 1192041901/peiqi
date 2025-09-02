import styles from "./index.module.scss";
function nav() {
  const list = [
    {
      name: "首页",
      path: "/",
      icon: "home",
      id: 1,
    },
    {
      name: "纪念日",
      path: "/commemorative",
      icon: "commemorative",
      id: 2,
    },
    {
      name: "相册",
      path: "/album",
      icon: "album",
      id: 3,
    },
    {
      name: "代办",
      path: "/agency",
      icon: "agency",
      id: 4,
    },
    {
      name: "猪窝",
      path: "/user",
      icon: "user",
      id: 5,
    },
  ];
  return (
    <div className={styles.nav}>
      {list.map((item) => (
        <div className={styles.item} key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default nav;
