import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../hooks/useQualities";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQuality();
    const qual = getQuality(id);
    if (!isLoading) {
        return (
            <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>
        );
    } else "Loading...";
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
