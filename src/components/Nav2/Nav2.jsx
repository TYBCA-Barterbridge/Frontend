import React from "react";
import styles from "./Nav2.module.css";
import { Link , useNavigate} from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { CircleLoader } from "react-spinners";

  const Nav2 = () => {
    const { email } = useAuth();
    const navigate = useNavigate();
    console.log(email)
  
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

    if (isLoading) return <CircleLoader color={"blue"} size={24} />;
  

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

          <a href="./CustomerCare" className={styles.button}>
            Customer Care
            <img
              src="https://img.icons8.com/?size=100&id=51413&format=png&color=000000"
              alt=""
              className={styles.icon1}
            />
          </a>
        </div>

        <div className={styles.right}>
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

          {email ? (
            <button className={styles.button} color="red" onClick={handleLogout}>
              <MdLogout /> Sign Out
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
