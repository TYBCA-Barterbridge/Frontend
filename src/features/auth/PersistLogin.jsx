import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";
import { CircleLoader } from "react-spinners";
import { CSSTransition } from 'react-transition-group';
import './transition.css'; // Import your CSS for transitions

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            }

            if (!token && persist) verifyRefreshToken();
        }

        return () => effectRan.current = true;
    }, []);

    let content;
    if (!persist) { // persist: no
        console.log('no persist');
        content = <Outlet />;
    } else if (isLoading) { // persist: yes, token: no
        console.log('loading');
        content =  (
            <div className="flex justify-center items-center h-screen">
              <div>
                <h1>Loading...</h1>
                <CircleLoader color={"blue"} className="flex justify-center items-center" />
              </div>
            </div>
          );
    } else if (isError) { // persist: yes, token: no
        console.log('error');
        content = (
            <CSSTransition
                in={true}
                timeout={100}
                classNames="fade"
                unmountOnExit
            >
                <p className='errmsg'>
                    <Navigate to={'/SignIn'} message={`${error?.data?.message}`}>
                        Please login again
                    </Navigate>
                </p>
            </CSSTransition>
        );
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        console.log('success');
        content = <Outlet />;
    } else if (token && isUninitialized) { // persist: yes, token: yes
        console.log('token and uninit');
        content = <Outlet />;
    }

    return content;
}

export default PersistLogin;
