import Dialog from "../../../../comment/dialog";
import styles from "./index.module.scss";
function About({ setAboutState }) {
  const callDialog = {
    onClose: () => {
      setAboutState(false);
    },
    onSure: () => {
      setAboutState(false);
    },
  };

  const params = {
    title: "关于我们",
    sureSpan: "确定",
    cancelSpan: "取消",
  };
  return (
    <>
      <Dialog callDialog={callDialog} params={params}>
        <div className={styles.aboutContent}>
          <div className={styles.logo}>💖</div>
          <div className={styles.title}>
            一款专为情侣设计的纪念应用，帮助记录你们的甜蜜瞬间。
          </div>
          <div className={styles.code}>版本号1.0.0</div>
          <div className={styles.desc}>
            本项目由Mr.
            Deng开发，数据存储基于supabase实现，如有使用问题或者需求建议可以联系我。
            <br />
            邮箱：1192041901@qq.com
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default About;
