import { useState } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import supabase from "../../../utils/supabase";
function Register() {
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // 注册失败，显示错误信息
        messageApi.open({
          type: "error",
          content: error.message || "注册失败，请重试",
        });
      } else if (data) {
        // 注册成功
        messageApi.open({
          type: "success",
          content: "注册成功！请前往邮箱验证",
        });
        // navigate("/login");
      }
    } catch (err) {
      // 捕获其他异常
      messageApi.open({
        type: "error",
        content: "网络错误，请重试",
      });
    }
  };

  return (
    <div className={styles.register}>
      {contextHolder}
      <div className={styles.registerContainer}>
        <div className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>创建账户</h1>
          <p className={styles.registerSubtitle}>加入爱情猪圈，开启甜蜜之旅</p>
        </div>

        <form className={styles.registerForm} onSubmit={handleSubmit}>
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

          <button type="submit" className={styles.registerButton}>
            注册
          </button>
        </form>

        <div className={styles.registerFooter}>
          <p className={styles.loginText}>
            已有账户？
            <span
              className={styles.loginLink}
              onClick={() => {
                navigate("/login");
              }}
            >
              立即登录
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
