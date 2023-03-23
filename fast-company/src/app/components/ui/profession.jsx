import React from "react";

import { useProfession } from "../hooks/useProfessins";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string.isRequired
};
export default Profession;
