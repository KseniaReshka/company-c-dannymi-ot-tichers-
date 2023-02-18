import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import CheckBoxField from "../../common/form/checkBoxField";

const UserForm = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    // console.log("userId", userId);
    // console.log("user", user);
    // console.log("name", user.name);

    const [data, setData] = useState({
        name: "`${user.name}`",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
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
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const handleParams = () => {
        console.log(useParams());
        history.push(`/users/${userId}`);
    };

    if (user) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        type="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        options={professions}
                        name="profession"
                        onChange={handleChange}
                        value={data.profession}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={data.qualities}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <CheckBoxField
                        value={data.licence}
                        onChange={handleChange}
                        name="licence"
                    >
                        Подтвердить <a>лицензионное соглашение</a>
                    </CheckBoxField>
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        onClick={handleParams}
                        // disabled={!isValid}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserForm;
