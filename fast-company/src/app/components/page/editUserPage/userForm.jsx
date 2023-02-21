import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
// import CheckBoxField from "../../common/form/checkBoxField";

const UserForm = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [user, setUser] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    useEffect(() => {
        api.users.getById(userId).then((data) =>
            setUser((prevState) => ({
                ...prevState,
                ...data,
                qualities: data.qualities.map((qual) => {
                    console.log("qual", qual);
                    return {
                        label: qual.name,
                        value: qual._id
                    };
                }),
                profession: Object.keys(data).map((prof) => {
                    console.log("prof", data[prof]);
                    return {
                        label: data[prof].name,
                        value: data[prof]._id
                    };
                })
            }))
        );
    }, []);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = user;
        console.log({
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const handleParams = () => {
        api.users.update(userId, user);
        history.push(`/users/${userId}`);
    };
    console.log("user", user);
    if (user) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        type="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Электронная почта"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        options={professions}
                        name="profession"
                        onChange={handleChange}
                        value={user.profession}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={user.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={user.qualities}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        onClick={handleParams}
                        // disabled={!isValid}
                    >
                        обновить
                    </button>
                </form>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserForm;
