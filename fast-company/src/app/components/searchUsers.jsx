import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ handeleSearch, search }) => {
    return (
        <div className="mb-3">
            <input
                type="text"
                value={search}
                className="search_input"
                placeholder="Search..."
                onChange={handeleSearch}
            />
        </div>
    );
};
SearchUsers.propTypes = {
    handeleSearch: PropTypes.func,
    search: PropTypes.string
};

export default SearchUsers;
