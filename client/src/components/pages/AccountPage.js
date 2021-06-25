import React from 'react'
import Layout from "../wrappers/Layout/Layout"
import {useSelector} from "react-redux";
import LinkButton from "../ui/LinkButton/LinkButton";
import LogoutButton from "../ui/LogoutButton/LogoutButton";
import UserProfile from "../containers/Profile";
import Spinner from "../ui/Spinner/Spinner";

const AccountPage = () => {
    const user = useSelector(state => state.users.activeUser)

    return (
        <Layout>
            {
                user
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