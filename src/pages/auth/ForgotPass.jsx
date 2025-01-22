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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = {email}
    try {
        const response = await forgotPassword(id).unwrap(); // Pass email as an object
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


  const handleEmailInput = (e) => setEmail(e.target.value);

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
              <button type="submit" className={styles.submitButton}>Send</button>
          </form>

          <div className={styles.links}>
            <a href="./SignIn" className={styles.link}>
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
      <footer>
        <div
          style={{
            textAlign: "center",
            textJustify:"initial",
            color: "white",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "2rem",
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
      </footer>
    </>
  );
};

export default ForgotPass;
