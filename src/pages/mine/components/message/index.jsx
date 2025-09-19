import { useEffect } from "react";
import Dialog from "../../../../comment/dialog";
import styles from "./index.module.scss";
function Message({ setMessageState, bingDingOther }) {
  const callDialog = {
    onClose: () => {
      setMessageState(false);
    },
    onSure: () => {
      setMessageState(false);
    },
  };
  useEffect(() => {
    console.log(bingDingOther);
  }, [bingDingOther]);
  const params = {
    title: "消息处理",
    sureSpan: "确定",
    cancelSpan: "取消",
  };
  return (
    <Dialog callDialog={callDialog} params={params}>
      <div className={styles.messageContent}>
        <div className={styles.messageItem}></div>
      </div>
    </Dialog>
  );
}
export default Message;
