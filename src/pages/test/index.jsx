import {
  handleClick,
  handleUpdate,
  handleDelete,
  handleRegister,
  handleLogin,
  handleGetUser,
  handleLogout,
  handleUnsubscribe,
  sendBindingRequest,
  acceptBindingRequest,
  rejectBindingRequest,
  getUserBindings,
  getBoundUsers,
  checkUsersBound,
  getBoundUserProfile,
} from "./data";

function Test() {
  return (
    <div>
      <button
        onClick={() => {
          handleClick("e210c009-6e86-4ae6-9b89-dd085344335a");
        }}
      >
        获取数据
      </button>
      <br />
      <button
        onClick={() => {
          handleUpdate("e210c009-6e86-4ae6-9b89-dd085344335a");
        }}
      >
        修改数据
      </button>
      <br />
      <button
        onClick={() => {
          handleRegister();
        }}
      >
        注册
      </button>
      <br />
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        登录
      </button>
      <br />
      <button
        onClick={() => {
          handleGetUser();
        }}
      >
        获取当前用户
      </button>
      <br />
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        登出
      </button>
      <br />
      <button
        onClick={() => {
          handleUnsubscribe();
        }}
      >
        注销
      </button>
      <br />
      <button
        onClick={() => {
          handleDelete("e210c009-6e86-4ae6-9b89-dd085344335a");
        }}
      >
        删除数据
      </button>
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          sendBindingRequest("e210c009-6e86-4ae6-9b89-dd085344335a");
        }}
      >
        发送绑定请求
      </button>
      <br />
      <button
        onClick={() => {
          acceptBindingRequest("58b9923d-4778-4fd6-8a61-17d130289f4a");
        }}
      >
        接受绑定请求
      </button>
      <br />
      <button
        onClick={() => {
          rejectBindingRequest("29211362-5e27-45d0-a4d4-5faa5841b69d");
        }}
      >
        拒绝绑定请求
      </button>
      <br />
      <button
        onClick={() => {
          getUserBindings();
        }}
      >
        获取用户绑定关系
      </button>
      <br />
      <button
        onClick={() => {
          getBoundUsers();
        }}
      >
        获取已绑定用户列表
      </button>
      <br />
      <button
        onClick={() => {
          checkUsersBound("e210c009-6e86-4ae6-9b89-dd085344335a");
        }}
      >
        检查两个用户是否已绑定
      </button>
      <br />
      <button
        onClick={() => {
          getBoundUserProfile("e210c009-6e86-4ae6-9b89-dd085344335a");
        }}
      >
        获取绑定用户资料
      </button>
    </div>
  );
}

export default Test;
