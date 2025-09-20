import { useSelector } from "react-redux";
import Dialog from "../../../../comment/dialog";
import { getUserInfoInfo } from "../../../../store/modules/userInfo/selectors";
import styles from "./index.module.scss";
function Share({ setShareState, toast }) {
  const userInfoInfo = useSelector(getUserInfoInfo);
  const callDialog = {
    onClose: () => {
      setShareState(false);
    },
    onSure: () => {
      handleCopy();
      setShareState(false);
    },
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(userInfoInfo.id);
    toast({
      type: "success",
      content: "复制成功",
    });
  };
  const params = {
    title: "分享码",
    sureSpan: "复制",
    cancelSpan: "取消",
  };
  return (
    <>
      <Dialog callDialog={callDialog} params={params}>
        <div className={styles.shareContent}>
          <div className={styles.shareItem}>{userInfoInfo.id}</div>
        </div>
      </Dialog>
    </>
  );
}
export default Share;
