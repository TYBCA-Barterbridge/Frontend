import styles from "./ForgotPass.module.css";
import { React, useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authApiSlice";
import useTitle from "../../hooks/useTitle";
import { CircleLoader } from "react-spinners";

const ForgotPass = () => {
  useTitle("Forgot Password");

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    
    setEmailError(""); // Clear any previous error
    const id = { email };

    try {
      const response = await forgotPassword(id).unwrap();
      console.log("Response:", response);
      setEmail("");
      navigate("/Reset");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing input");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message || "Forgot Password failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <CircleLoader color={"blue"} size={24} />;

  return (
    <>
      <p ref={errRef} className={errClass} aria-live="assertive" tabIndex="-1">
        {errMsg}
      </p>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Forgot Password</h2>
          <p className={styles.description}>
            Enter your email address to verify.
          </p>

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
            
            {emailError && (
              <p
                style={{
                  color: "red",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                {emailError}
              </p>
            )}

            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={emailError !== ""}
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
            textDecoration: "none"
          }}
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default ForgotPass;
