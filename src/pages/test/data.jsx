import getID from "../../utils/getID";
import supabase from "../../utils/supabase";

export const getdata = async () => {
  const id = getID();

  //查询对方的资料
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", "29211362-5e27-45d0-a4d4-5faa5841b69d");
};
