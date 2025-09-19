import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { getUserInfoInfo } from "../../store/modules/userInfo/selectors";
import { delDate } from "../../utils/delDate";
import Edit from "./components/edit";
import Message from "./components/message";
import Apply from "./components/apply";
import Setting from "./components/setting";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
const Mine = () => {
  const userInfoInfo = useSelector(getUserInfoInfo);
  const diffDays = userInfoInfo?.loveBefore
    ? delDate(userInfoInfo.loveBefore)
    : 0;
  const [editState, setEditState] = useState(false);
  const [messageState, setMessageState] = useState(false);
  const [applyState, setApplyState] = useState(false);
  const [settingState, setSettingState] = useState(false);
  const [bingDing, setBingDing] = useState([]);
  const [bingDingUser, setBingDingUser] = useState([]); //发起者
  const [bingDingOther, setBingDingOther] = useState([]); //接收者

  //获取绑定关系的相关信息
  const getBingDing = async () => {
    const { data, error } = await supabase
      .from("user_bindings")
      .select("*")
      .or(`user_a_id.eq.${userInfoInfo.id},user_b_id.eq.${userInfoInfo.id}`)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    } else {
      setBingDing(data);
    }
  };
  useEffect(() => {
    getBingDing();
  }, []);
  useEffect(() => {
    setBingDingUser(
      bingDing.find((item) => item.user_a_id === userInfoInfo.id)
    );
    setBingDingOther(
      bingDing.find((item) => item.user_b_id === userInfoInfo.id)
    );
  }, [bingDing]);
  return (
    <div className={styles.mine}>
      <div className={styles.mineHeader}>
        <span>爱情猪圈</span>
      </div>
      {userInfoInfo.binding && (
        <div className={styles.com}>
          <div className={styles.imgwarp}>
            <div className={styles.img}>
              <img
                src={
                  userInfoInfo?.boyImg ||
                  "https://i.ibb.co/S4HxfbYy/20250919113727-32-13.png"
                }
                alt=""
              />
            </div>
            <div className={styles.img}>
              <img
                src={
                  userInfoInfo?.girlImg ||
                  "https://i.ibb.co/Y4TnW6jJ/20250919113657-31-13.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className={styles.comName}>
            {userInfoInfo?.boy || ""}
            <span>❤️</span>
            {userInfoInfo?.girl || ""}
          </div>
          <div className={styles.comDesc}>恋爱中·已相恋{diffDays}天</div>
          <div className={styles.comBtn}>
            <span>编辑</span>
          </div>
        </div>
      )}
      {!userInfoInfo?.binding && (
        <div className={styles.com}>
          <div className={styles.imgOnce}>
            <div className={styles.img}>
              <img src={userInfoInfo?.avatar || ""} alt="" />
            </div>
          </div>
          <div className={styles.comName}>{userInfoInfo?.username || ""}</div>
          <div className={styles.comdesc}>单身🐕</div>
          <div className={styles.comBtn} onClick={() => setEditState(true)}>
            <span>编辑</span>
          </div>
          <div className={styles.span}>
            <span>邀请另一半</span>
          </div>
        </div>
      )}
      {/* 功能区域 */}
      <div className={styles.contion}>
        <div className={styles.title}>个人信息</div>
        <div className={styles.warp}>
          <div className={styles.item} onClick={() => setEditState(true)}>
            <div className={styles.left}>
              <div className={styles.icon + " " + styles.icon1}>👤</div>
              <div className={styles.name}>编辑个人资料</div>
            </div>
            <div className={styles.right}>→</div>
          </div>
        </div>
      </div>
      <div className={styles.contion}>
        <div className={styles.title}>关系管理</div>
        <div className={styles.warp}>
          <div className={styles.item} onClick={() => setMessageState(true)}>
            <div className={styles.left}>
              <div className={styles.icon + " " + styles.icon2}>📩</div>
              <div className={styles.name}>消息处理</div>
            </div>
            <div className={styles.right}>→</div>
          </div>
          <div className={styles.item} onClick={() => setApplyState(true)}>
            <div className={styles.left}>
              <div className={styles.icon + " " + styles.icon2}>💌</div>
              <div className={styles.name}>恋爱申请</div>
            </div>
            <div className={styles.right}>→</div>
          </div>
          <div className={styles.item} onClick={() => setSettingState(true)}>
            <div className={styles.left}>
              <div className={styles.icon + " " + styles.icon2}>📅</div>
              <div className={styles.name}>恋爱设置</div>
            </div>
            <div className={styles.right}>→</div>
          </div>
        </div>
      </div>
      <div className={styles.contion}>
        <div className={styles.title}>系统设置</div>
        <div className={styles.warp}>
          <div className={styles.item}>
            <div className={styles.left}>
              <div className={styles.icon + " " + styles.icon3}>ℹ️</div>
              <div className={styles.name}>关于我们</div>
            </div>
            <div className={styles.right}>→</div>
          </div>
          <div className={styles.item}>
            <div className={styles.left}>
              <div className={styles.icon + " " + styles.icon3}>🔄</div>
              <div className={styles.name}>退出登录</div>
            </div>
            <div className={styles.right}>→</div>
          </div>
        </div>
      </div>
      {/* 编辑个人信息弹窗 */}
      {editState && <Edit setEditState={setEditState} />}
      {/* 消息处理弹窗 */}
      {messageState && (
        <Message
          setMessageState={setMessageState}
          bingDingOther={bingDingOther}
        />
      )}
      {/* 恋爱申请弹窗 */}
      {applyState && (
        <Apply setApplyState={setApplyState} bingDingUser={bingDingUser} />
      )}
      {/* 恋爱设置弹窗 */}
      {settingState && <Setting setSettingState={setSettingState} />}
    </div>
  );
};

export default Mine;
