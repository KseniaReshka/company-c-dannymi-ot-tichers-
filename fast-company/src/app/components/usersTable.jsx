import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchUsers from "./searchUsers";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import { Link } from "react-router-dom";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    selectedProf,
    ...rest
}) => {
    const [search, setSearch] = useState("");

    const handeleSearch = (e) => {
        console.log("search", search);
        setSearch(e.target.value);
    };

    const filteredSearch = users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    });

    useEffect(() => {
        setSearch("");
    }, [selectedProf]);

    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <>
            <SearchUsers handeleSearch={handeleSearch} />
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={filteredSearch}
            />
        </>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedProf: PropTypes.object.isRequired
};

export default UserTable;
