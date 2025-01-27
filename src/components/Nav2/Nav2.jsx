import React from "react";
import useAuth from "../../hooks/useAuth";
import styles from "./Nav2.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";

const Nav2 = () => {
  const { email } = useAuth();
  const navigate = useNavigate();

  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await sendLogout().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdownButton}>All Category ↓</div>
            <div className={styles.dropdownContent}>
              <div className={styles.option}>Exchange</div>
              <div className={styles.option}>Workshop</div>
            </div>
          </div>
          <Link to="/Care" className={styles.button}>
            Customer Care
            <img
              src="https://img.icons8.com/?size=100&id=51413&format=png&color=000000"
              alt=""
              className={styles.icon1}
            />
          </Link>
        </div>

        <div className={styles.right}>
          <p>Follow us :</p>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className={styles.icon}
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              className={styles.icon}
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              className={styles.icon}
            />
          </a>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdownButton}>English ↓</div>
            <div className={styles.dropdownContent}>
              <div className={styles.option}>Spanish</div>
              <div className={styles.option}>French</div>
              <div className={styles.option}>Chinese</div>
            </div>
          </div>
          {email ? (
            <button style={{backgroundColor:"#f8f9fa",border:"none", color:"#f8f9fa"}}>
              invisible
            </button>
          ) : (
            <Link to="/SignIn" className={styles.button}>
              Sign in
              <img
                src="https://img.icons8.com/?size=100&id=52625&format=png&color=000000"
                alt=""
                className={styles.icon1}
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav2;
