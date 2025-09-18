import supabase from "./supabase";
const getID = async () => {
  const userInfo = useSelector(getUserInfoInfo);
  if (!userInfo || !userInfo.id) {
    return null;
  }
  return userInfo.id;
};
export default getID;
