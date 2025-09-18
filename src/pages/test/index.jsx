import supabase from "../../utils/supabase";

function Test() {
  // 获取数据
  const handleClick = async (userId) => {
    // 根据用户 ID 获取 profiles 表中的信息
    const { data, error, status } = await supabase
      .from("profiles")
      .select("*") // 选择需要的字段
      .eq("id", userId) // 根据 ID 匹配用户
      .single(); // 只期望返回一条记录
    if (error && status !== 406) {
      // 406 错误表示未找到记录，可能是新用户还没有 profile
      console.error("获取用户配置信息出错:", error.message);
      return null;
    }

    if (data) {
      console.log("用户配置信息:", data);
      return data;
    }
    return null;
  };
  //修改数据
  const handleUpdate = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: "newusername",
        ceshi: "https://newwebsite.com",
        age: 100,
        id: userId,
      })
      .eq("id", userId);
    console.log(data);
    console.log(error);
  };
  //删除数据
  const handleDelete = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);
    console.log(data);
    console.log(error);
  };
  //注册
  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "1192041901@qq.com",
      password: "dengshuai0919",
    });
    console.log(data);
    console.log(error);
  };
  //登录
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "1192041901@qq.com",
      password: "123456",
    });
    console.log(data);
    console.log(error);
  };
  //获取当前用户
  const handleGetUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    console.log(error);
  };
  //登出
  const handleLogout = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log(data);
    console.log(error);
  };
  //注销
  const handleUnsubscribe = async () => {
    const { error } = await supabase.auth.admin.deleteUser(
      "e210c009-6e86-4ae6-9b89-dd085344335a" // 具体的用户ID
    );
  };
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
    </div>
  );
}

export default Test;
