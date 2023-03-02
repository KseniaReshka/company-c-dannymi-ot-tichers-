import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserForm from "../components/page/editUserPage/userForm";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit ? (
                    <UserForm />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
