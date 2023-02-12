import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ handeleSearch }) => {
    return (
        <div className="mb-3">
            <input
                type="text"
                className="search_input"
                placeholder="Search..."
                onChange={handeleSearch}
            />
        </div>
    );
};
SearchUsers.propTypes = {
    handeleSearch: PropTypes.func
};

export default SearchUsers;
