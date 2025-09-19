import getID from "../../utils/getID";
import supabase from "../../utils/supabase";

// 发送绑定请求
const sendBindingRequest = async (targetUserId) => {
  const id = getID();

  const { data, error } = await supabase.rpc("create_binding_request", {
    target_user_id: targetUserId,
    initiator_user_id: id,
  });

  if (error) throw error;
  return data;
};

// 接受绑定请求
const acceptBindingRequest = async (bindingId) => {
  const id = getID();

  const { error } = await supabase.rpc("accept_binding_request", {
    binding_id: bindingId,
    acceptor_user_id: id,
  });

  if (error) throw error;
};

// 拒绝绑定请求
const rejectBindingRequest = async (bindingId) => {
  const id = getID();

  const { error } = await supabase
    .from("user_bindings")
    .update({
      status: "rejected",
      updated_at: new Date().toISOString(),
    })
    .eq("id", bindingId)
    .or(`user_a_id.eq.${id},user_b_id.eq.${id}`)
    .eq("status", "pending");

  if (error) throw error;
};

// 获取用户的绑定关系
const getUserBindings = async () => {
  const id = getID();

  const { data, error } = await supabase
    .from("user_bindings")
    .select(
      `
        id,
        status,
        created_at,
        accepted_at,
        initiated_by,
        user_a:user_a_id (id, username),
        user_b:user_b_id (id, username)
      `
    )
    .or(`user_a_id.eq.${id},user_b_id.eq.${id}`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// 获取已绑定的用户列表
const getBoundUsers = async () => {
  const id = getID();

  const { data, error } = await supabase
    .from("user_bindings")
    .select(
      `
        id,
        partner:user_b_id (id, username, avatar_url, email, phone, created_at)
      `
    )
    .eq("user_a_id", id)
    .eq("status", "accepted")
    .union(
      supabase
        .from("user_bindings")
        .select(
          `
            id,
            partner:user_a_id (id, username, avatar_url, email, phone, created_at)
          `
        )
        .eq("user_b_id", id)
        .eq("status", "accepted")
    );

  if (error) throw error;
  return data.map((item) => item.partner);
};

// 检查两个用户是否已绑定
const checkUsersBound = async (userId1, userId2) => {
  if (!userId1 || !userId2) return false;

  let userA, userB;
  if (userId1 < userId2) {
    userA = userId1;
    userB = userId2;
  } else {
    userA = userId2;
    userB = userId1;
  }

  const { data, error } = await supabase
    .from("user_bindings")
    .select("status")
    .eq("user_a_id", userA)
    .eq("user_b_id", userB)
    .eq("status", "accepted")
    .single();

  return !!data;
};

// 查看绑定用户资料的函数
const getBoundUserProfile = async (userId) => {
  const id = getID();

  // 首先检查是否有绑定关系
  const isBound = await bindingService.checkUsersBound(id, userId);
  if (!isBound) {
    throw new Error("无权限查看该用户资料");
  }

  // 如果有绑定关系，可以查看所有信息
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

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
export {
  sendBindingRequest,
  acceptBindingRequest,
  rejectBindingRequest,
  getUserBindings,
  getBoundUsers,
  checkUsersBound,
  getBoundUserProfile,
  handleClick,
  handleUpdate,
  handleDelete,
  handleRegister,
  handleLogin,
  handleGetUser,
  handleLogout,
  handleUnsubscribe,
};
