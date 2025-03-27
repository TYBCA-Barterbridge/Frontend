import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import useTitle from "../../hooks/useTitle";
import usePersist from "../../hooks/usePersist";
import styles from "./SignIn.module.css";
import { CircleLoader } from "react-spinners";

const SignIn = () => {
  useTitle("Login");

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    

    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePwdInput = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) return <CircleLoader style={{ alignContent: "center" }} />;

  const content = (
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
          className={styles.formContainer}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sign In
          </motion.h1>
          <div className={styles.orDivider}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Email"
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                ref={userRef}
                value={email}
                onChange={handleUserInput}
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
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                placeholder="Password"
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                onChange={handlePwdInput}
                value={password}
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

            <motion.button
              type="submit"
              className={styles.signInButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>

            <motion.label
              htmlFor="persist"
              className={styles.persistCheck}
              whileHover={{ scale: 1.05 }}
            >
              <input
                type="checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </motion.label>
          </form>

          <motion.div
            className={styles.links}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/Forgot" className={styles.link}>
              Forgot Password?
            </Link>
            <Link to="/SignUp" className={styles.link}>
              Sign Up
            </Link>
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

  return content;
};

export default SignIn;
