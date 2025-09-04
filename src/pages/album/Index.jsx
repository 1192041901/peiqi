import { useState } from "react";
import * as type from "./index.module.scss";
import { navList } from "./constants/index.jsx";
import Add from "./components/add/index.jsx";
const Album = () => {
  const [active, setActive] = useState(0);
  const [addState, setAddState] = useState(false);
  const handleNav = (index) => {
    setActive(index);
  };
  return (
    <div className={type.album}>
      {/* 顶部 */}
      <div className={type.albumTop}>
        <div className={type.albumTopLeft}>猪猪回忆</div>
        <div className={type.albumTopRight}>
          <span onClick={() => setAddState(true)}>+上传照片</span>
        </div>
      </div>
      {/* 导航 */}
      <div className={type.albumNav}>
        <div className={type.albumNavWarp}>
          {navList.map((item, index) => (
            <div
              className={`${type.albumNavItem} ${
                active === index ? type.active : ""
              }`}
              key={index}
              onClick={() => handleNav(index)}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 内容 */}
      <div className={type.albumContent}>
        <div className={type.albumContentItem}></div>
      </div>
      {/* 添加 */}
      {addState && <Add navList={navList} setAddState={setAddState} />}
    </div>
  );
};

export default Album;
