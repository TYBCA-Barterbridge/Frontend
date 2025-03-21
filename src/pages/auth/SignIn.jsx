import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1>Loading...</h1>
        <CircleLoader color="blue" className="flex justify-center items-center" />
      </div>
    </div>
  );
  

  const content = (
    <>
      <p ref={errRef} className={errClass} aria-live="assertive" tabIndex="-1">
        {errMsg}
      </p>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>BarterBridge</h1>
          <div className={styles.orDivider}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={handlePwdInput}
              value={password}
              required
            />
            <button type="submit" className={styles.signInButton}>
              Sign In
            </button>
            <label htmlFor="persist">
              <input
                type="checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </form>
          <div className={styles.links}>
            <a href="/Forgot" className={styles.link}>
              Forgot Password?
            </a>
            <a href="/SignUp" className={styles.link}>
              Sign Up
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

  return content;
};

export default SignIn;
