import { useEffect, useState } from "react";
import type from "./index.module.scss";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../../../../store/modules/album/selectors";
const Add = ({ navList, setAddState }) => {
  const { upload, loading, error, imageUrl, setImageUrl } = useImageUpload();
  const [spanName, setSpanName] = useState("从相册中选择");
  const [typeActive, setTypeActive] = useState(navList[1].name);
  const [desc, setDesc] = useState("");
  const album = useSelector(getAlbum);

  const dispatch = useDispatch();
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
  // 上传业务处理
  const handleUpload = () => {
    if (!imageUrl) {
      alert("请选择照片");
      return;
    }

    if (!typeActive) {
      alert("请选择照片分类");
      return;
    }
    if (!desc) {
      alert("请输入照片描述");
      return;
    }
    dispatch({
      type: "UPDATE_ALBUM",
      payload: {
        id: album[album.length - 1].id + 1,
        img: imageUrl,
        type: typeActive,
        desc: desc,
      },
    });
    setAddState(false);
    setImageUrl("");
    setDesc("");
    setTypeActive(navList[1].name);
  };
  //输入限制
  const handleInput = (e) => {
    if (e.target.value.length > 200) {
      alert("输入不能超过200个字");
      return;
    }
    setDesc(e.target.value);
  };
  return (
    <div className={type.add}>
      <div className={type.addContent}>
        <div className={type.header}>上传猪猪相册</div>
        <div className={type.item}>
          <div className={type.title}>选择照片</div>
          <div className={type.com} onClick={handleSelect}>
            <span>{spanName}</span>
          </div>
        </div>
        <div className={type.item}>
          <div className={type.title}>照片分类</div>
          <select
            className={type.select}
            onChange={(e) => setTypeActive(e.target.value)}
          >
            {navList.slice(1).map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={type.item}>
          <div className={type.title}>照片描述</div>
          <input
            className={type.input}
            type="text"
            value={desc}
            onChange={(e) => handleInput(e)}
            placeholder="比如：和猪猪的第一次约会"
          />
        </div>
        <div className={type.control}>
          <div className={type.cancel} onClick={() => setAddState(false)}>
            <span>取消</span>
          </div>
          <div className={type.sure} onClick={handleUpload}>
            <span>上传</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
