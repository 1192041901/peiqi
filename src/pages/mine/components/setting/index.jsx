import Dialog from "../../../../comment/dialog";
import styles from "./index.module.scss";
function Setting({ setSettingState, toast }) {
  const callDialog = {
    onClose: () => {
      setSettingState(false);
    },
    onSure: () => {
      setSettingState(false);
    },
  };
  const handleSplit = () => {
    toast({
      type: "warning",
      content: "压根就没打算开发该功能，有问题请联系开发者！！！",
      duration: 5,
    });
    setSettingState(false);
  };
  const params = {
    title: "设置",
    sureSpan: "关闭",
    cancelSpan: "取消",
  };
  return (
    <>
      <Dialog callDialog={callDialog} params={params}>
        <div className={styles.settingContent} onClick={handleSplit}>
          <span className={styles.span}>我要分手💔</span>
        </div>
      </Dialog>
    </>
  );
}
export default Setting;
