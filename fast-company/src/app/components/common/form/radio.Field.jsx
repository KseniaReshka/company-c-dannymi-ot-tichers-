import React from "react";
import PropTypes from "prop-types";

const RadioField = (options, onChange, value, name, label) => {
    console.log("options", options.option);
    return (
        <div className="md-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            {options.option.map((option) => (
                <div
                    key={option.name + "_" + option.value}
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        checked={option.value === value}
                        id={option.name + "_" + option.value}
                        value={option.value}
                        onChange={onChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={option.name + "_" + option.value}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};
RadioField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    option: PropTypes.array,
    label: PropTypes.string
};

export default RadioField;
