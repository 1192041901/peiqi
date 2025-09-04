import { useEffect, useState } from "react";
import * as type from "./index.module.scss";
import { navList } from "./constants/index.jsx";
import Add from "./components/add/index.jsx";
import { useSelector } from "react-redux";
import { getAlbum } from "../../store/modules/album/selectors.jsx";
import Detail from "./components/detail/index.jsx";
import Hint from "./components/hint/index.jsx";
const Album = () => {
  const [active, setActive] = useState("全部"); // 当前选中的导航
  const [addState, setAddState] = useState(false); // 添加状态
  const album = useSelector(getAlbum); // 全部相册信息
  const [albumList, setAlbumList] = useState([]); // 当前选中的相册信息
  const [detailState, setDetailState] = useState(false); // 详情状态
  const [detailParams, setDetailParams] = useState({}); // 详情参数
  const [hintState, setHintState] = useState(true); // 提示状态
  // 导航
  const handleNav = (name) => {
    setActive(name);
  };
  // 详情
  const handleDetail = (item) => {
    setDetailState(true);
    setDetailParams(item);
  };
  // 相册信息筛选
  useEffect(() => {
    if (active === "全部") {
      setAlbumList(album);
    } else {
      setAlbumList(album.filter((item) => item.type === active));
    }
  }, [active, album]);
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
                active === item.name ? type.active : ""
              }`}
              key={index}
              onClick={() => handleNav(item.name)}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 内容 */}
      <div className={type.albumContent}>
        <div className={type.albumContentWarp}>
          {albumList.map((item, index) => (
            <div
              className={type.item}
              key={index}
              onClick={() => handleDetail(item)}
            >
              <img src={item.img} alt="" />
              <div className={type.desc}>{item.type}</div>
            </div>
          ))}
        </div>
      </div>
      {/* 添加 */}
      {addState && <Add navList={navList} setAddState={setAddState} />}
      {/* 详情 */}
      {detailState && (
        <Detail params={detailParams} setDetailState={setDetailState} />
      )}
      {/* 提示 */}
      {hintState && <Hint setHintState={setHintState} />}
    </div>
  );
};

export default Album;
