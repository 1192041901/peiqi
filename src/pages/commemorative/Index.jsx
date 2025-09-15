import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { getDate } from "../../store/modules/date/selectors";
import { delDate, delDate2 } from "../../utils/delDate";
const Commemorative = () => {
  const [addState, setAddState] = useState(false);
  const listAll = useSelector(getDate);
  const [listTop, setListTop] = useState([]);
  const [listOnce, setListOnce] = useState([]);
  const [listYear, setListYear] = useState([]);
  useEffect(() => {
    setListTop(listAll.filter((item) => item.top));
    setListOnce(listAll.filter((item) => item.type === "once" && !item.top));
    setListYear(listAll.filter((item) => item.type === "year" && !item.top));
  }, [listAll]);
  return (
    <div className={styles.commemorative}>
      <div className={styles.commemorativeTop}>
        <div className={styles.commemorativeTopLeft}>纪念日管理</div>
        <div className={styles.commemorativeTopRight}>
          <span onClick={() => setAddState(true)}>+</span>
        </div>
      </div>
      <div className={styles.commemorativeContent}>
        <div className={styles.title + " " + styles.important}>置顶纪念日</div>
        <div className={styles.content}>
          {listTop.map((item) => (
            <div className={styles.commemorativeItem} key={item.id}>
              <div className={styles.commemorativeItemName}>
                <div className={styles.commemorativeItemNameTop}>
                  {item.name}
                </div>
                <div className={styles.commemorativeItemNameBottom}>
                  <div className={styles.commemorativeItemNameBottomLeft}>
                    {item.date}
                  </div>
                  {item.type === "year" && (
                    <div className={styles.commemorativeItemNameBottomRight}>
                      每年重复
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commemorativeItemDate}>
                <div className={styles.commemorativeItemDateTop}>
                  {item.type === "year"
                    ? delDate2(item.date)
                    : delDate(item.date)}
                </div>
                <div className={styles.commemorativeItemDateSpan}>
                  {item.type === "year" ? "天后" : "已过去"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.line}></div>
        <div className={styles.title}>单次纪念日</div>
        <div className={styles.content}>
          {listOnce.map((item) => (
            <div className={styles.commemorativeItem} key={item.id}>
              <div className={styles.commemorativeItemName}>
                <div className={styles.commemorativeItemNameTop}>
                  {item.name}
                </div>
                <div className={styles.commemorativeItemNameBottom}>
                  <div className={styles.commemorativeItemNameBottomLeft}>
                    {item.date}
                  </div>
                  {item.type === "year" && (
                    <div className={styles.commemorativeItemNameBottomRight}>
                      每年重复
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commemorativeItemDate}>
                <div className={styles.commemorativeItemDateTop}>
                  {item.type === "year"
                    ? delDate2(item.date)
                    : delDate(item.date)}
                </div>
                <div className={styles.commemorativeItemDateSpan}>
                  {item.type === "year" ? "天后" : "已过去"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.title}>逐年纪念日</div>
        <div className={styles.content}>
          {listYear.map((item) => (
            <div className={styles.commemorativeItem} key={item.id}>
              <div className={styles.commemorativeItemName}>
                <div className={styles.commemorativeItemNameTop}>
                  {item.name}
                </div>
                <div className={styles.commemorativeItemNameBottom}>
                  <div className={styles.commemorativeItemNameBottomLeft}>
                    {item.date}
                  </div>
                  {item.type === "year" && (
                    <div className={styles.commemorativeItemNameBottomRight}>
                      每年重复
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commemorativeItemDate}>
                <div className={styles.commemorativeItemDateTop}>
                  {item.type === "year"
                    ? delDate2(item.date)
                    : delDate(item.date)}
                </div>
                <div className={styles.commemorativeItemDateSpan}>
                  {item.type === "year" ? "天后" : "已过去"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commemorative;
