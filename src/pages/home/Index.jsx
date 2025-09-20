import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { delDate } from "../../utils/delDate";
import { useEffect, useState } from "react";
import { quote } from "../../constants/quote";
import { getDate } from "../../store/modules/date/selectors";
import {
  getUserInfoInfo,
  getLoverInfo,
} from "../../store/modules/userInfo/selectors";
import { four } from "./constants/data";
import supabase from "../../utils/supabase";
import getID from "../../utils/getID";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const data = useSelector(getDate);
  const userInfoInfo = useSelector(getUserInfoInfo);
  const loverInfo = useSelector(getLoverInfo);
  //获取纪念日数据
  const [mainData, setMainData] = useState([]);
  const handleGetDate = async () => {
    const id = await getID();
    const { data, error } = await supabase
      .from("commemorative")
      .select("*")
      .eq("user_id", id);
    const sortList = data.sort((a, b) => b.top - a.top);
    setMainData(sortList);
  };

  // 添加空值检查
  const diffDays = userInfoInfo?.loveBefore
    ? delDate(userInfoInfo.loveBefore)
    : 0;

  const [num, setNum] = useState(0);

  //跳转
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
    }
  };
  useEffect(() => {
    // 获取随机语录
    setNum(Math.floor(Math.random() * quote.length));
    //获取纪念日信息
    handleGetDate();
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <div className={styles.name}>
          {userInfoInfo?.username || ""}
          {loverInfo?.username && <span>&</span>}
          {loverInfo?.username || ""}
        </div>
      </div>
      <div className={styles.loveData}>
        <div className={styles.lovespan}>我们已经在一起</div>
        <div className={styles.lovemain}>
          {diffDays}
          <span className={styles.lovemainspan}>天啦</span>
        </div>
        <div className={styles.lovedesc}>始于{userInfoInfo?.loveBefore}</div>
      </div>
      <div
        className={styles.memory}
        onClick={() => handleNavigate("/commemorative")}
      >
        <div className={styles.lovespan}>📅重要的纪念日</div>
        <div className={styles.dataItem}>
          {mainData.slice(0, 3).map((item) => (
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
          <div
            className={styles.fourItem}
            key={index}
            onClick={() => handleNavigate(item.path)}
          >
            <div className={styles.fourItemName}>{item.logo}</div>
            <div className={styles.fourItemName}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
