import { useEffect, useState } from "react";
import type from "./index.module.scss";
function Hint() {
  const [timerState, setTimerState] = useState(false);
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    let timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        console.log(prevTimer, 66666);
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setTimerState(true);
          clearInterval(timerInterval);
          return prevTimer;
        }
      });
    }, 1000);

    // 清理定时器
    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  const handleConfirm = () => {
    if (timerState) {
      console.log("确定");
    }
  };
  return (
    <div className={type.hint}>
      <div className={type.hintWarp}>
        <div className={type.hintTitle}>重要提示信息</div>
        <div className={type.hintContent}>
          <span>
            该项目图片由开源免费的远程第三方云存储，每个月大概500次的图片上传的机会，且图片的加载速度和图片的隐私性均无法得到保障，切记不要上传一些过于隐私性的图片。
          </span>
        </div>
        <div className={type.hintFooter}>
          <span onClick={handleConfirm}>
            {timerState ? "确定" : `${timer}s后确定`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hint;
