import React from "react";
import styles from "./SignUp.module.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import useTitle from "../../hooks/useTitle";
import { CircleLoader } from "react-spinners";

const SignUp = () => {
  useTitle("Sign Up");

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Validation states
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCPasswordError] = useState("");

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

  const validateName = (name, type) => {
    if (!name.trim()) {
      return `${type} is required`;
    }
    if (name.length < 2) {
      return `${type} must be at least 2 characters`;
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return `${type} can only contain letters`;
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const fnameValidation = validateName(fname, "First name");
    const lnameValidation = validateName(lname, "Last name");
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const cpasswordValidation = validateConfirmPassword(cpassword);

    setFnameError(fnameValidation);
    setLnameError(lnameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setCPasswordError(cpasswordValidation);

    if (fnameValidation || lnameValidation || emailValidation || passwordValidation || cpasswordValidation) {
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

  const handleFnameInput = (e) => {
    setFname(e.target.value);
    setFnameError(validateName(e.target.value, "First name"));
  };

  const handleLnameInput = (e) => {
    setLname(e.target.value);
    setLnameError(validateName(e.target.value, "Last name"));
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePwdInput = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
    if (cpassword) {
      setCPasswordError(validateConfirmPassword(cpassword));
    }
  };

  const handleCpwdInput = (e) => {
    setCPassword(e.target.value);
    setCPasswordError(validateConfirmPassword(e.target.value));
  };

  if (isLoading) return <CircleLoader color={"#4a90e2"} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {errMsg && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            ref={errRef}
            className={styles.errmsg}
            aria-live="assertive"
          >
            {errMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sign Up
          </motion.h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>First Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                ref={userRef}
                type="text"
                className={`${styles.input} ${fnameError ? styles.inputError : ''}`}
                value={fname}
                onChange={handleFnameInput}
                placeholder="Enter your first name"
                required
              />
              <AnimatePresence>
                {fnameError && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.errorMessage}
                  >
                    {fnameError}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Last Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                className={`${styles.input} ${lnameError ? styles.inputError : ''}`}
                value={lname}
                onChange={handleLnameInput}
                placeholder="Enter your last name"
                required
              />
              <AnimatePresence>
                {lnameError && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.errorMessage}
                  >
                    {lnameError}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                value={email}
                onChange={handleEmailInput}
                placeholder="Enter your email"
                required
              />
              <AnimatePresence>
                {emailError && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.errorMessage}
                  >
                    {emailError}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                value={password}
                onChange={handlePwdInput}
                placeholder="Enter your password"
                required
              />
              <AnimatePresence>
                {passwordError && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.errorMessage}
                  >
                    {passwordError}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                className={`${styles.input} ${cpasswordError ? styles.inputError : ''}`}
                value={cpassword}
                onChange={handleCpwdInput}
                placeholder="Confirm your password"
                required
              />
              <AnimatePresence>
                {cpasswordError && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.errorMessage}
                  >
                    {cpasswordError}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </form>

          <motion.div
            className={styles.links}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>
              Already have an account?{" "}
              <Link to="/SignIn" className={styles.link}>
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{
          backgroundColor: "white",
          padding: "10px",
          justifySelf: "center",
        }}
        whileHover={{ scale: 1.05 }}
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
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
