import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import axios from "axios";
import { setTokens } from "../services/localStorage.service";
// import localStorageService from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [setUser] = useState({});
    // currentUser,const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function signUp({ email, password, ...rest }) {
        const key = "AIzaSyDz2E8Obfez2uUAHJxBJuANHsFnNTdlSu4";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);

            await createUser({ _id: data.localId, email, ...rest });
            console.log("data", data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log("message", message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пoльзователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function logIn({ email, password, ...rest }) {
        const key = "AIzaSyDz2E8Obfez2uUAHJxBJuANHsFnNTdlSu4";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log("data1", data);
            // const { getAccessToken } = localStorageService();
            // const accessToken = getAccessToken();
            // console.log("AccessToken", accessToken);
            await getUser({ _id: data.localId });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log("message", message);
            if (code === 400) {
                let errorObject;
                if (message === "INVALID_PASSWORD") {
                    errorObject = {
                        password: "неверный пароль"
                    };
                }
                if (message === "EMAIL_NOT_FOUND") {
                    errorObject = {
                        email: "Пoльзователя с таким email не существует"
                    };
                    // <RegisterForm />;
                }
                throw errorObject;
            }
        }
    }
    async function getUser(_id) {
        console.log(_id);
        try {
            const { content } = await userService.get(_id);
            console.log("content", content);
            setUser(content);
            history.push("/");
        } catch (error) {
            errorCatcher(error);
        }
    }

    // const [users, setUsers] = useState([]);
    // const [isLoading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // useEffect(() => {
    //     getUsers();
    // }, []);
    // useEffect(() => {
    //     if (error !== null) {
    //         toast(error);
    //         setError(null);
    //     }
    // }, [error]);
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, logIn, createUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
