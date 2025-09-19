import Dialog from "../../../../comment/dialog";
import { useImageUpload } from "../../../../hooks/useImageUpload";
import styles from "./index.module.scss";
import supabase from "../../../../utils/supabase";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleUserInfo } from "../../../../store/modules/userInfo/action";
import { getUserInfoInfo } from "../../../../store/modules/userInfo/selectors";
function Edit({ setEditState }) {
  const userInfoInfo = useSelector(getUserInfoInfo);
  const dispatch = useDispatch();
  const callDialog = {
    onClose: () => {
      setEditState(false);
    },
    onSure: async () => {
      //修改用户信息api调用
      await updateUserInfo();
      //更新store用户信息
      const res = await dispatch(handleUserInfo());
      //关闭弹窗
      setEditState(false);
    },
  };
  const params = {
    title: "编辑个人信息",
    sureSpan: "确定",
    cancelSpan: "取消",
  };
  const { upload, loading, error, imageUrl, setImageUrl } = useImageUpload();
  const [spanName, setSpanName] = useState("从相册中选择");
  const [form, setForm] = useState({
    name: "",
    age: "",
  });
  //修改个人信息
  const updateUserInfo = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: form.name,
        avatar: imageUrl,
        age: form.age,
      })
      .eq("id", userInfoInfo.id);
  };
  //上传状态文案切换
  useEffect(() => {
    if (loading) {
      setSpanName("上传中...");
    } else {
      if (imageUrl) {
        setSpanName("上传成功(可点击修改)");
      } else {
        setSpanName("从相册中选择");
      }
    }
  }, [imageUrl, loading]);

  // 文件上传
  const handleSelect = () => {
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.onchange = async (e) => {
      const selectedFile = e.target.files[0];

      // 检查是否选择了文件
      if (!selectedFile) return;

      // 文件大小验证 (15MB限制)
      if (selectedFile.size > 15 * 1024 * 1024) {
        alert("文件大小不能超过15MB");
        return;
      }

      // 文件类型验证
      if (!selectedFile.type.startsWith("image/")) {
        alert("请选择图片文件");
        return;
      }

      try {
        const url = await upload(selectedFile);
        // upload函数内部已经设置了imageUrl，这里不需要重复设置
        console.log("图片上传成功:", url);
      } catch (err) {
        console.error("图片上传失败:", err);
        alert("图片上传失败，请重试");
      }
    };

    file.click();
    file.remove();
  };
  return (
    <Dialog callDialog={callDialog} params={params}>
      <div className={styles.editContentBody}>
        <div className={styles.item}>
          <div className={styles.title}>姓名</div>
          <input
            className={styles.input}
            type="text"
            placeholder="请输入姓名"
            maxLength={4}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>修改头像</div>
          <div className={styles.com} onClick={handleSelect}>
            <span>{spanName}</span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>年龄</div>
          <input
            className={styles.input}
            type="number"
            placeholder="请输入年龄"
            maxLength={3}
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>
      </div>
    </Dialog>
  );
}
export default Edit;
