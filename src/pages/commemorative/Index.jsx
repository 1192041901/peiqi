import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { delDate, delDate2 } from "../../utils/delDate";
import Dialog from "../../comment/dialog";
import supabase from "../../utils/supabase";
import getID from "../../utils/getID";
const Commemorative = () => {
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [listAll, setListAll] = useState([]);
  const [listTop, setListTop] = useState([]);
  const [listOnce, setListOnce] = useState([]);
  const [listYear, setListYear] = useState([]);
  const [addParams, setAddParams] = useState({
    name: "",
    type: "once",
    date: "",
    top: false,
  });
  const [editParams, setEditParams] = useState({
    id: null,
    name: "",
    type: "once",
    date: "",
    top: false,
  });
  // 获取纪念日信息
  const handleGetDate = async () => {
    const id = await getID();
    const { data, error } = await supabase
      .from("commemorative")
      .select("*")
      .eq("user_id", id);
    if (error) {
      console.log(error);
    } else {
      setListAll(data);
    }
  };
  useEffect(() => {
    handleGetDate();
  }, []);
  // 新增纪念日文案
  const dialogParams = {
    title: "添加纪念日",
    sureSpan: "确定",
    cancelSpan: "取消",
  };
  // 编辑纪念日文案
  const editDialogParams = {
    title: "编辑纪念日",
    sureSpan: "确定",
    cancelSpan: "取消",
  };

  // 纪念日日期处理
  const handleDate = (e) => {
    let date = e.target.value;
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = date.split("-")[2];
    let date2 = year + "-" + month + "-" + day;
    setAddParams({ ...addParams, date: date2 });
  };
  // 编辑纪念日日期处理
  const handleEditDate = (e) => {
    let date = e.target.value;
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = date.split("-")[2];
    let date2 = year + "-" + month + "-" + day;
    setEditParams({ ...editParams, date: date2 });
  };
  const dispatch = useDispatch();
  // 新增纪念日(确定)
  const handleAdd = async () => {
    if (addParams.name === "" || addParams.date === "") {
      alert("请填写完信息");
      return;
    }
    const id = await getID();
    const { data, error } = await supabase.from("commemorative").insert({
      user_id: id,
      name: addParams.name,
      type: addParams.type,
      date: addParams.date,
      top: addParams.top,
    });
    if (error) {
      console.log(error);
    } else {
      handleGetDate();
    }
    setAddState(false);
    resetAddParams();
  };
  // 新增纪念日(取消)
  const handleCancel = () => {
    setAddState(false);
    resetAddParams();
  };
  // 重置新增纪念日参数
  const resetAddParams = () => {
    setAddParams({
      name: "",
      type: "once",
      date: "",
      top: false,
    });
  };
  // 编辑纪念日(确定)
  const handleEdit = async () => {
    if (editParams.name === "" || editParams.date === "") {
      alert("请填写完信息");
      return;
    }
    const id = await getID();
    const { data, error } = await supabase
      .from("commemorative")
      .update({
        name: editParams.name,
        type: editParams.type,
        date: editParams.date,
        top: editParams.top,
      })
      .eq("id", editParams.id);
    if (error) {
      console.log(error);
    } else {
      handleGetDate();
    }
    setEditState(false);
    resetEditParams();
  };
  // 编辑纪念日(取消)
  const handleEditCancel = () => {
    setEditState(false);
    resetEditParams();
  };
  // 重置编辑纪念日参数
  const resetEditParams = () => {
    setEditParams({
      id: null,
      name: "",
      type: "once",
      date: "",
      top: false,
    });
  };
  // 打开编辑弹窗
  const openEditDialog = (item) => {
    setEditParams({
      id: item.id,
      name: item.name,
      type: item.type,
      date: item.date,
      top: item.top,
    });
    setEditState(true);
  };
  // 新增纪念日回调
  const callDialog = {
    onClose: handleCancel,
    onSure: handleAdd,
  };
  // 编辑纪念日回调
  const editCallDialog = {
    onClose: handleEditCancel,
    onSure: handleEdit,
  };
  // 删除纪念日
  const handleDelete = async () => {
    const id = await getID();
    const { data, error } = await supabase
      .from("commemorative")
      .delete()
      .eq("id", editParams.id)
      .eq("user_id", id);
    if (error) {
      console.log(error);
    } else {
      handleGetDate();
    }

    setEditState(false);
    resetEditParams();
  };
  // 纪念日分类处理
  useEffect(() => {
    setListTop(listAll.filter((item) => item.top));
    setListOnce(listAll.filter((item) => item.type === "once" && !item.top));
    setListYear(listAll.filter((item) => item.type === "year" && !item.top));
  }, [listAll]);

  return (
    <div className={styles.commemorative}>
      {/* 新增纪念日 */}
      {addState && (
        <Dialog callDialog={callDialog} params={dialogParams}>
          <div className={styles.addContent}>
            <div className={styles.adiTitle}>纪念日名称</div>
            <input
              className={styles.adiInput}
              value={addParams.name}
              onChange={(e) =>
                setAddParams({ ...addParams, name: e.target.value })
              }
              type="text"
              placeholder="比如：和猪猪的第一次约会"
            />
            <div className={styles.adiTitle}>纪念日类型</div>
            <select
              className={styles.adiSelect}
              value={addParams.type}
              onChange={(e) =>
                setAddParams({ ...addParams, type: e.target.value })
              }
            >
              <option value="year">每年重复</option>
              <option value="once">单次纪念日</option>
            </select>
            <div className={styles.adiTitle}>纪念日日期</div>
            <input
              className={styles.adiInput}
              type="date"
              value={addParams.date}
              onChange={(e) => handleDate(e)}
            />
            <div className={styles.adiTitle}>是否置顶</div>
            <select
              className={styles.adiSelect}
              value={addParams.top}
              onChange={(e) =>
                setAddParams({ ...addParams, top: e.target.value })
              }
            >
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </div>
        </Dialog>
      )}
      {/* 编辑纪念日*/}
      {editState && (
        <Dialog callDialog={editCallDialog} params={editDialogParams}>
          <div className={styles.addContent}>
            <div className={styles.adiTitle}>纪念日名称</div>
            <input
              className={styles.adiInput}
              value={editParams.name}
              onChange={(e) =>
                setEditParams({ ...editParams, name: e.target.value })
              }
              type="text"
              placeholder="比如：和猪猪的第一次约会"
            />
            <div className={styles.adiTitle}>纪念日类型</div>
            <select
              className={styles.adiSelect}
              value={editParams.type}
              onChange={(e) =>
                setEditParams({ ...editParams, type: e.target.value })
              }
            >
              <option value="year">每年重复</option>
              <option value="once">单次纪念日</option>
            </select>
            <div className={styles.adiTitle}>纪念日日期</div>
            <input
              className={styles.adiInput}
              type="date"
              value={editParams.date}
              onChange={(e) => handleEditDate(e)}
            />
            <div className={styles.adiTitle}>是否置顶</div>
            <select
              className={styles.adiSelect}
              value={editParams.top}
              onChange={(e) =>
                setEditParams({ ...editParams, top: e.target.value })
              }
            >
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
            <div className={styles.btn} onClick={handleDelete}>
              删除
            </div>
          </div>
        </Dialog>
      )}

      <div className={styles.commemorativeTop}>
        <div className={styles.commemorativeTopLeft}>纪念日管理</div>
        <div className={styles.commemorativeTopRight}>
          <span onClick={() => setAddState(true)}>+</span>
        </div>
      </div>
      <div className={styles.commemorativeContent}>
        <div className={styles.title + " " + styles.important}>置顶纪念日</div>
        <div className={styles.content}>
          {listTop.map((item) => (
            <div
              className={styles.commemorativeItem}
              key={item.id}
              onClick={() => openEditDialog(item)}
            >
              <div className={styles.commemorativeItemName}>
                <div className={styles.commemorativeItemNameTop}>
                  {item.name}
                </div>
                <div className={styles.commemorativeItemNameBottom}>
                  <div className={styles.commemorativeItemNameBottomLeft}>
                    {item.date}
                  </div>
                  {item.type === "year" && (
                    <div className={styles.commemorativeItemNameBottomRight}>
                      每年重复
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commemorativeItemDate}>
                <div className={styles.commemorativeItemDateTop}>
                  {item.type === "year"
                    ? delDate2(item.date)
                    : delDate(item.date)}
                </div>
                <div className={styles.commemorativeItemDateSpan}>
                  {item.type === "year" ? "天后" : "已过去"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.line}></div>
        <div className={styles.title}>单次纪念日</div>
        <div className={styles.content}>
          {listOnce.map((item) => (
            <div
              className={styles.commemorativeItem}
              key={item.id}
              onClick={() => openEditDialog(item)}
            >
              <div className={styles.commemorativeItemName}>
                <div className={styles.commemorativeItemNameTop}>
                  {item.name}
                </div>
                <div className={styles.commemorativeItemNameBottom}>
                  <div className={styles.commemorativeItemNameBottomLeft}>
                    {item.date}
                  </div>
                  {item.type === "year" && (
                    <div className={styles.commemorativeItemNameBottomRight}>
                      每年重复
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commemorativeItemDate}>
                <div className={styles.commemorativeItemDateTop}>
                  {item.type === "year"
                    ? delDate2(item.date)
                    : delDate(item.date)}
                </div>
                <div className={styles.commemorativeItemDateSpan}>
                  {item.type === "year" ? "天后" : "已过去"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.title}>逐年纪念日</div>
        <div className={styles.content}>
          {listYear.map((item) => (
            <div
              className={styles.commemorativeItem}
              key={item.id}
              onClick={() => openEditDialog(item)}
            >
              <div className={styles.commemorativeItemName}>
                <div className={styles.commemorativeItemNameTop}>
                  {item.name}
                </div>
                <div className={styles.commemorativeItemNameBottom}>
                  <div className={styles.commemorativeItemNameBottomLeft}>
                    {item.date}
                  </div>
                  {item.type === "year" && (
                    <div className={styles.commemorativeItemNameBottomRight}>
                      每年重复
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.commemorativeItemDate}>
                <div className={styles.commemorativeItemDateTop}>
                  {item.type === "year"
                    ? delDate2(item.date)
                    : delDate(item.date)}
                </div>
                <div className={styles.commemorativeItemDateSpan}>
                  {item.type === "year" ? "天后" : "已过去"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commemorative;
