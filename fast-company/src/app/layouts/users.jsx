import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/editUserPage/userPage";
import UsersList from "../components/page/usersListPage/usersListPage";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
