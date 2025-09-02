import * as type from "./index.module.css";
function loading() {
  return (
    <div className={type.warp}>
      <div className={type.main}>
        <div className={type.img}></div>
        <div className={type.span}>拼了猪命加载中......</div>
      </div>
    </div>
  );
}
export default loading;
