import styles from "./ForgotPass.module.css";
import { React, useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useVerifyMutation } from "../../features/auth/authApiSlice";
import useTitle from "../../hooks/useTitle";
import { CircleLoader } from "react-spinners";

const Verification = () => {
  useTitle("Verification");

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [verify, { isLoading }] = useVerifyMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, otp };
    try {
      await verify(userData).unwrap();
      setEmail("");
      setOtp("");
      navigate("/SignIn");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing input");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message || "Verification failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleOtpInput = (e) => setOtp(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <CircleLoader color={"blue"} size={24} />;

  return (
    <>
      <p ref={errRef} className={errClass} aria-live="assertive" tabIndex="-1">
                {errMsg}
            </p>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Enter OTP</h2>
          <p className={styles.description}>
            Enter the verification code sent to your email
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={handleEmailInput}
              placeholder="Enter your email"
              required
            />
            <label className={styles.label}>Verify</label>
            <input
              type="text"
              className={styles.input}
              value={otp}
              onChange={handleOtpInput}
              placeholder="Enter 6-digit code"
              required
            />
            <button type="submit" className={styles.submitButton}>
              Verify
            </button>
          </form>

          <div className={styles.links}>
            <Link to="/SignIn" className={styles.link}>
              Resend OTP
            </Link>
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

export default Verification;
