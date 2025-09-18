import { useState } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import supabase from "../../../utils/supabase";
function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // 登录失败，显示错误信息
        messageApi.open({
          type: "error",
          content: error.message || "登录失败，请重试",
        });
      } else if (data) {
        // 登录成功
        messageApi.open({
          type: "success",
          content: "登录成功！",
        });
        navigate("/");
      }
    } catch (error) {
      // 捕获其他异常
      messageApi.open({
        type: "error",
        content: "网络错误，请重试",
      });
    }
  };

  return (
    <div className={styles.login}>
      {contextHolder}
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>欢迎回来</h1>
          <p className={styles.loginSubtitle}>登录你的爱情猪圈账户</p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>邮箱地址</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="请输入邮箱地址"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="请输入密码"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            登录
          </button>
        </form>

        <div className={styles.loginFooter}>
          <p className={styles.registerText}>
            还没有账户？
            <span
              className={styles.registerLink}
              onClick={() => {
                navigate("/register");
              }}
            >
              立即注册
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
