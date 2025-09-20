import { useEffect, useState } from "react";
import * as type from "./index.module.scss";
import { navList } from "./constants/index.jsx";
import Add from "./components/add/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getIsFirst } from "../../store/modules/album/selectors.jsx";
import { getLoverInfo } from "../../store/modules/userInfo/selectors.jsx";
import Detail from "./components/detail/index.jsx";
import Hint from "./components/hint/index.jsx";
import supabase from "../../utils/supabase.jsx";
import getID from "../../utils/getID.jsx";

const Album = () => {
  const [active, setActive] = useState("全部"); // 当前选中的导航
  const [addState, setAddState] = useState(false); // 添加状态
  const [albumList, setAlbumList] = useState([]); // 当前选中的相册信息
  const [detailState, setDetailState] = useState(false); // 详情状态
  const [detailParams, setDetailParams] = useState({}); // 详情参数
  const [hintState, setHintState] = useState(false); // 提示状态
  const dispatch = useDispatch();
  const isFirst = useSelector(getIsFirst);
  const [album, setAlbum] = useState([]);
  const loverInfo = useSelector(getLoverInfo);
  // 导航
  const handleNav = (name) => {
    setActive(name);
  };
  // 详情
  const handleDetail = (item) => {
    setDetailState(true);
    setDetailParams(item);
  };
  // 获取相册信息
  const handleGetAlbum = async () => {
    const id = await getID();
    if (loverInfo?.id) {
      const { data, error } = await supabase
        .from("album")
        .select("*")
        .or(`user_id.eq.${id},user_id.eq.${loverInfo.id}`);
      setAlbum(data);
    } else {
      const { data, error } = await supabase
        .from("album")
        .select("*")
        .eq("user_id", id);
      setAlbum(data);
    }
  };
  useEffect(() => {
    handleGetAlbum();
  }, []);
  // 相册信息筛选
  useEffect(() => {
    if (active === "全部") {
      setAlbumList(album);
    } else {
      setAlbumList(album.filter((item) => item.type === active));
    }
  }, [active, album]);
  // 是否是第一次
  useEffect(() => {
    if (isFirst) {
      setHintState(true);
      dispatch({
        type: "UPDATE_IS_FIRST",
        payload: false,
      });
    }
  }, [isFirst]);
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
      {addState && (
        <Add
          navList={navList}
          setAddState={setAddState}
          handleGetAlbum={handleGetAlbum}
        />
      )}
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
