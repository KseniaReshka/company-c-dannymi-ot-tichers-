import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";

function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male"
    });
    const [professions, setProfession] = useState();
    console.log("professions", professions);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    const handeleChange = (e) => {
        // console.log("e", e);
        // console.log("e.tar", e.target);
        // console.log("e.tar.n", e.target.name);
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    // useEffect(() => {
    //     console.log("professions2", professions);
    // }, [professions]);
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
        },
        profession: {
            isRequired: {
                message: "Выберете Вашу профессию"
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
            <SelectField
                label="Выберете Вашу профессию"
                onChange={handeleChange}
                defaultOption="Choose..."
                options={professions}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                value={data.sex}
                options={[
                    { name: "Male", value: "male" },
                    { name: "FeMale", value: "FEmale" },
                    { name: "other", value: "other" }
                ]}
                onChange={handeleChange}
                name="sex"
                label="Выберете "
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
}

export default RegisterForm;
