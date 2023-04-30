import React from "react";
// import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    // getProfessionsByIds,
    getProfessionsLoadingStatus
} from "../../store/profession";

const Profession = ({ name }) => {
    // const { isLoading, getProfession } = useProfessions();
    const isLoading = useSelector(getProfessionsLoadingStatus());
    // const prof = useSelector(getProfessionsByIds(id));
    if (!isLoading) {
        return <p>{name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
