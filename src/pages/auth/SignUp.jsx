import React from "react";
import styles from "./SignUp.module.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import useTitle from "../../hooks/useTitle";
import { CircleLoader } from "react-spinners";
const SignUp = () => {
  useTitle("Sign Up");

  const userRef = useRef(null); // Ensure it's initialized
  const errRef = useRef(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [fname, lname, email, password, cpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    const userData = { fname, lname, email, password };

    try {
      await register(userData).unwrap();
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setCPassword("");
      navigate("/Verify");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing input");
      } else if (err.status === 409) {
        setErrMsg("Email already registered");
      } else {
        setErrMsg(err.data?.message || "Registration failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleFnameInput = (e) => setFname(e.target.value);
  const handleLnameInput = (e) => setLname(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleCpwdInput = (e) => setCPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <CircleLoader color={"blue"} />;

  return (
    <>
      <p ref={errRef} className={errClass} aria-live="assertive" tabIndex="-1">
                {errMsg}
            </p>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Sign Up</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>First Name</label>
            <input
              ref={userRef} // Attach userRef to this input
              type="text"
              className={styles.input}
              value={fname}
              onChange={handleFnameInput}
              placeholder="Enter your first name"
              required
            />

            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              value={lname}
              onChange={handleLnameInput}
              placeholder="Enter your last name"
              required
            />

            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={handleEmailInput}
              placeholder="Enter your email"
              required
            />

            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={handlePwdInput}
              placeholder="Enter your password"
              required
            />

            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              className={styles.input}
              value={cpassword}
              onChange={handleCpwdInput}
              placeholder="Confirm your password"
              required
            />

            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>

          <div className={styles.links}>
            <p>
              Already have an account?{" "}
              <Link to="/SignIn" className={styles.link}>
                Sign In
              </Link>
            </p>
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

export default SignUp;
