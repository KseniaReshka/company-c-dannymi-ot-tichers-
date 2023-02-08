import React, { useEffect, useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [, setErrors] = useState();
    const handeleChange = (e) => {
        // console.log("name", e.target.name);
        // console.log("value", e.target.value);
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = {};
        console.log(data);
        for (const fieldName in data) {
            if (data[fieldName].trim() === "") {
                errors[fieldName] = `${fieldName} обязательно для заполнения`;
            }
            setErrors(errors);
            return Object.keys(errors).length === 0 || false;
        }
    };
    const handeleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log("data", data);
    };
    return (
        <form onSubmit={handeleSubmit}>
            <TextField
                label="электронная почта"
                type="text"
                name="email"
                value={data.email}
                onChange={handeleChange}
            />
            <TextField
                label="пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handeleChange}
            />
            <button>Submit</button>
        </form>
    );
};

export default Login;
