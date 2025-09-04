import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { getUserInfo } from "../../store/modules/user/selectors";
import { delDate } from "../../utils/delDate";
import { useEffect, useState } from "react";
import { quote } from "../../constants/quote";
const Home = () => {
  const userInfo = useSelector(getUserInfo);

  const diffDays = delDate(userInfo.loveBefore);
  const mainData = userInfo.data;
  const four = [
    {
      logo: "📷",
      name: "情侣相册",
    },
    {
      logo: "✍️",
      name: "恋爱日记",
    },
    {
      logo: "✅",
      name: "代办清单",
    },
    {
      logo: "❓",
      name: "情侣问答",
    },
  ];
  const [num, setNum] = useState(0);
  useEffect(() => {
    setNum(Math.floor(Math.random() * quote.length));
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <div className={styles.name}>
          {userInfo.girl}&{userInfo.boy}
        </div>
      </div>
      <div className={styles.loveData}>
        <div className={styles.lovespan}>我们已经在一起</div>
        <div className={styles.lovemain}>{diffDays}</div>
        <div className={styles.lovedesc}>始于{userInfo.loveBefore}</div>
      </div>
      <div className={styles.memory}>
        <div className={styles.lovespan}>📅重要的纪念日</div>
        <div className={styles.dataItem}>
          {mainData.map((item) => (
            <div className={styles.loveItem} key={item.id}>
              <div className={styles.loveItemName}>{item.name}</div>
              <div className={styles.loveItemDate}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.lovespan}>🎉今天想对你说的话</div>
        <div className={styles.dataItem}>
          <span className={styles.mdItemName}>{quote[num]}</span>
        </div>
      </div>
      <div className={styles.four}>
        {four.map((item, index) => (
          <div className={styles.fourItem} key={index}>
            <div className={styles.fourItemName}>{item.logo}</div>
            <div className={styles.fourItemName}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
