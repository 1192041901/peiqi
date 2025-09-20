import Dialog from "../../../../comment/dialog";
import styles from "./index.module.scss";
import supabase from "../../../../utils/supabase";
import getID from "../../../../utils/getID";
import { useState } from "react";
function Apply({ setApplyState, toast, getBingDing }) {
  const [targetUserId, setTargetUserId] = useState("");
  const callDialog = {
    onClose: () => {
      setApplyState(false);
    },
    onSure: () => {
      sendBindingRequest(targetUserId);
      setApplyState(false);
      getBingDing();
    },
  };
  const params = {
    title: "恋爱申请",
    sureSpan: "发起申请",
    cancelSpan: "取消",
  };

  // 发送绑定请求
  const sendBindingRequest = async (targetUserId) => {
    const id = getID();
    const { data, error } = await supabase.rpc("create_binding_request", {
      target_user_id: targetUserId,
      initiator_user_id: id,
    });
    if (error) throw error;
    toast({
      type: "success",
      content: "发送成功",
    });
    return data;
  };
  return (
    <Dialog callDialog={callDialog} params={params}>
      <div className={styles.applyContent}>
        <input
          type="text"
          placeholder="请输入对方的分享码"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
        />
      </div>
    </Dialog>
  );
}
export default Apply;
