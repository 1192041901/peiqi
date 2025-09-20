import { getdata } from "./data";
function Test() {
  return (
    <div>
      <button onClick={() => getdata()}>获取信息</button>
    </div>
  );
}

export default Test;
