import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handeleChange = (e) => {
        // console.log("name", e.target.name);
        // console.log("value", e.target.value);
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать заглавную букву"
            },
            isCapitalDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен содержать минимум 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        console.log("data, validatorConfig", data, validatorConfig);
        const errors = validator(data, validatorConfig);
        console.log("errors is login", errors);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    console.log("isValid", isValid);
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
                error={errors.email}
            />
            <TextField
                label="пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handeleChange}
                error={errors.password}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
