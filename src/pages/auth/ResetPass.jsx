import styles from "./ResetPass.module.css";
import { React, useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApiSlice";
import useTitle from "../../hooks/useTitle";
import { CircleLoader } from "react-spinners";

const ResetPass = () => {
  useTitle("Reset Password");

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, resetToken, newPassword };
    console.log("Submitting userData:", userData); // Debug
    try {
      await resetPassword(userData).unwrap();
      console.log("Password reset successful");
      setEmail("");
      navigate("/SignIn");
    } catch (err) {
      console.error("Password reset error:", err); // Debug
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing input");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message || "Reset Password failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleResetTokenInput = (e) => setResetToken(e.target.value);
  const handleNewPasswordInput = (e) => setNewPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <h1>Loading...</h1>
          <CircleLoader color={"blue"} className="flex justify-center items-center" />
        </div>
      </div>
    );

  return (
    <>
      <p
        ref={errRef}
        className={errClass}
        aria-live="assertive"
        color={"red"}
        tabIndex="-1"
      >
        {errMsg}
      </p>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Reset Password</h2>
          <p className={styles.description}>Enter the required fields.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              onChange={handleEmailInput}
              value={email}
              placeholder="Enter your email"
              required
            />
            <label className={styles.label}>OTP</label>
            <input
              type="text"
              className={styles.input}
              onChange={handleResetTokenInput}
              value={resetToken}
              placeholder="Enter OTP"
              required
            />
            <label className={styles.label}>New Password</label>
            <input
              type="text"
              className={styles.input}
              onChange={handleNewPasswordInput}
              value={newPassword}
              placeholder="Enter your new password"
              required
            />
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>

          <div className={styles.links}>
            <a href="./SignIn" className={styles.link}>
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
      <div
               style={{
                 backgroundColor: "white",
                 padding: "10px",
                 justifySelf: "center",
               }}
             >
               <Link
                 to="/"
                 style={{
                   color: "black",
                   textDecoration: "none"
                 }}
               >
                 Back to Home
               </Link>
             </div>
    </>
  );
};

export default ResetPass;
