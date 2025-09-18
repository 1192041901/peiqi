import styles from "./index.module.scss";
const Mine = () => {
  return (
    <div className={styles.mine}>
      <div className={styles.mineHeader}>
        <span>爱情猪圈</span>
      </div>
      <div className={styles.mineContent}>
        <div className={styles.mineWrap}></div>
        <div className={styles.mineContentItem}>
          <div className={styles.mineContentItemTitle}>
            <span>个人信息</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mine;
