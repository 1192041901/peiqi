import type from "./index.module.scss";
function Detail({ params, setDetailState }) {
  return (
    <div className={type.detail} onClick={() => setDetailState(false)}>
      <div className={type.warp}>
        <div className={type.detailHeader}>美好回忆</div>
        <div className={type.detailImg}>
          <img src={params.img} alt="" />
        </div>
        <div className={type.detailDesc}>
          <span>{params.desc}</span>
        </div>
      </div>
    </div>
  );
}
export default Detail;
