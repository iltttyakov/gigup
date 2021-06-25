import React, {useEffect} from 'react'
import {useSelector} from "react-redux"
import usersServices from "../../redux/users/usersServices"
import Profile from "../containers/Profile"
import Layout from "../wrappers/Layout/Layout"
import Spinner from "../ui/Spinner/Spinner";

const ProfilePage = ({match}) => {
    const currentUser = useSelector(state => state.users.currentUser)

    useEffect(() => usersServices.userFetch(match.params.id), [])
    
    return (
        <Layout>
            {
                currentUser
                    ? <Profile user={currentUser}/>
                    : <Spinner/>
            }
        </Layout>
    )
}

export default ProfilePage