import supabase from "./supabase";
const getID = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("用户未登录");
    return null;
  }
  return user.id;
};
export default getID;
