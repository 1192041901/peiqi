import type from "./index.module.scss";
import { useImageUpload } from "@/hooks/useImageUpload";
const Add = ({ navList, setAddState }) => {
  const { upload, loading, error, imageUrl, setImageUrl } = useImageUpload();

  const handleSelect = () => {
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.onchange = async (e) => {
      const selectedFile = e.target.files[0];

      // 检查是否选择了文件
      if (!selectedFile) return;

      // 文件大小验证 (5MB限制)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("文件大小不能超过5MB");
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

  const handleUpload = () => {
    console.log("上传");
  };
  return (
    <div className={type.add}>
      <div className={type.addContent}>
        <div className={type.header}>上传猪猪相册</div>
        <div className={type.item}>
          <div className={type.title}>选择照片</div>
          <div className={type.com} onClick={handleSelect}>
            <span>{loading ? "上传中..." : "从相册中选择"}</span>
          </div>
        </div>
        <div className={type.item}>
          <div className={type.title}>照片分类</div>
          <select className={type.select}>
            {navList.map((item, index) => (
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
