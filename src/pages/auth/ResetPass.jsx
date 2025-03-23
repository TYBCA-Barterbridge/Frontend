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
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, resetToken, newPassword]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // OTP validation (only numbers, exactly 6 digits)
  const validateOtp = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  // Password validation (at least 6 characters & 1 number)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!validateOtp(resetToken)) {
      setOtpError("OTP must be 6 digits");
      return;
    }
    if (!validatePassword(newPassword)) {
      setPasswordError("Password must be at least 6 characters & include a number");
      return;
    }

    setEmailError("");
    setOtpError("");
    setPasswordError("");

    const userData = { email, resetToken, newPassword };

    try {
      await resetPassword(userData).unwrap();
      console.log("Password reset successful");
      setEmail("");
      setResetToken("");
      setNewPassword("");
      navigate("/SignIn");
    } catch (err) {
      console.error("Password reset error:", err);
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

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value) ? "" : "Invalid email format");
  };

  const handleResetTokenInput = (e) => {
    setResetToken(e.target.value);
    setOtpError(validateOtp(e.target.value) ? "" : "OTP must be 6 digits");
  };

  const handleNewPasswordInput = (e) => {
    setNewPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value) ? "" : "Password must be at least 6 characters & include a number");
  };

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <CircleLoader color={"blue"} size={24} />;

  return (
    <>
      <p
        ref={errRef}
        style={{
          color: "red",
          marginBottom: "10px",
          fontSize: "14px",
        }}
        aria-live="assertive"
        tabIndex="-1"
      >
        {errMsg}
      </p>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Reset Password</h2>
          <p className={styles.description}>Enter the required fields.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Email Input */}
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              onChange={handleEmailInput}
              value={email}
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
                {emailError}
              </p>
            )}

            {/* OTP Input */}
            <label className={styles.label}>OTP</label>
            <input
              type="text"
              className={styles.input}
              onChange={handleResetTokenInput}
              value={resetToken}
              placeholder="Enter OTP"
              required
            />
            {otpError && (
              <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
                {otpError}
              </p>
            )}

            {/* New Password Input */}
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              className={styles.input}
              onChange={handleNewPasswordInput}
              value={newPassword}
              placeholder="Enter your new password"
              required
            />
            {passwordError && (
              <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
                {passwordError}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={emailError || otpError || passwordError}
            >
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
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default ResetPass;
