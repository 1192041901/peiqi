import { useEffect } from "react";
import Dialog from "../../../../comment/dialog";
import styles from "./index.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfoInfo } from "../../../../store/modules/userInfo/selectors";
import getID from "../../../../utils/getID";
import supabase from "../../../../utils/supabase";
function Message({ setMessageState, bingDing, getBingDing }) {
  const userInfoInfo = useSelector(getUserInfoInfo);
  const callDialog = {
    onClose: () => {
      setMessageState(false);
    },
    onSure: () => {
      setMessageState(false);
    },
  };
  const [bingDingUser, setBingDingUser] = useState([]); //我发起的
  const [bingDingOther, setBingDingOther] = useState([]); //我接收的
  useEffect(() => {
    console.log(bingDing);
    let arr1 = [];
    let arr2 = [];
    bingDing.map((item) => {
      if (item.initiated_by === userInfoInfo.id) {
        if (item.user_a.id === userInfoInfo.id) {
          arr1.push({ ...item, active: item.user_b });
        } else {
          arr1.push({ ...item, active: item.user_a });
        }
      } else {
        if (item.user_a.id === userInfoInfo.id) {
          arr2.push({ ...item, active: item.user_b });
        } else {
          arr2.push({ ...item, active: item.user_a });
        }
      }
    });
    setBingDingUser(arr1);
    setBingDingOther(arr2);
  }, [bingDing]);
  const params = {
    title: "消息处理",
    sureSpan: "确定",
    cancelSpan: "取消",
  };
  const handleAccept = async (bindingId) => {
    const id = getID();

    const { error } = await supabase.rpc("accept_binding_request", {
      binding_id: bindingId,
      acceptor_user_id: id,
    });
    if (error) throw error;
    getBingDing();
    //暂时用个省事的方式
    window.location.reload();
  };
  const handleReject = async (bindingId) => {
    const id = getID();

    const { data, error } = await supabase
      .from("user_bindings")
      .update({
        status: "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("initiated_by", bindingId)
      .or(`user_a_id.eq.${id},user_b_id.eq.${id}`)
      .eq("status", "pending");
    if (error) throw error;
    getBingDing();
  };
  return (
    <Dialog callDialog={callDialog} params={params}>
      <div className={styles.messageContent}>
        {bingDingUser.length > 0 && (
          <>
            <div className={styles.title}>我发起的</div>

            <div className={styles.warp}>
              {bingDingUser.map((item) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.left}>
                    <div className={styles.icon}>
                      <img src={item.active.avatar} alt="" />
                    </div>
                    <div className={styles.name}>{item.active.username}</div>
                  </div>
                  <div className={styles.right}>
                    {item.status === "pending" && <span>待对方响应</span>}
                    {item.status === "accepted" && <span>已同意</span>}
                    {item.status === "rejected" && <span>已拒绝</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {bingDingOther.length > 0 && (
          <>
            <div className={styles.title}>我接收的</div>

            <div className={styles.warp}>
              {bingDingOther.map((item) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.left}>
                    <div className={styles.icon}>
                      <img src={item.active.avatar} alt="" />
                    </div>
                    <div className={styles.name}>{item.active.username}</div>
                  </div>
                  <div className={styles.right2}>
                    {item.status === "pending" && (
                      <>
                        <span
                          className={styles.span1}
                          onClick={() => handleAccept(item.id)}
                        >
                          同意
                        </span>
                        <span
                          className={styles.span2}
                          onClick={() => handleReject(item.initiated_by)}
                        >
                          拒绝
                        </span>
                      </>
                    )}
                    {item.status === "accepted" && (
                      <span className={styles.span3}>已同意</span>
                    )}
                    {item.status === "rejected" && (
                      <span className={styles.span4}>已拒绝</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
export default Message;
