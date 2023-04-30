import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import { getQualitiesLoadingStatus } from "../../../store/qualities";
// import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    // const { isLoading } = useQualities();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "Loading...";
    console.log("qualities11111", qualities);
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
