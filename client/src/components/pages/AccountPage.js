import React from 'react'
import Layout from "../wrappers/Layout/Layout"
import {useSelector} from "react-redux";
import LinkButton from "../ui/LinkButton/LinkButton";
import LogoutButton from "../ui/LogoutButton/LogoutButton";
import UserProfile from "../containers/Profile";
import Spinner from "../ui/Spinner/Spinner";
import usersServices from "../../redux/users/usersServices";

const AccountPage = () => {
    const user = useSelector(state => state.users.activeUser)
    const isAuthenticated = usersServices.isAuthenticated()

    return (
        <Layout>
            {
                user && isAuthenticated
                    ? <>
                        <UserProfile user={user}/>
                        <LinkButton to={'/account-settings'}>Редактировать</LinkButton>
                        <LogoutButton/>
                    </>
                    : <Spinner/>
            }
        </Layout>
    )
}

export default AccountPage