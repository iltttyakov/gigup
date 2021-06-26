import React from 'react'
import {useSelector} from "react-redux"
import Profile from "../ui/Profile/Profile"
import Avatar from "../ui/Avatar/Avatar"
import UserForm from "./UserForm"
import usersServices from "../../redux/users/usersServices"
import Spinner from "../ui/Spinner/Spinner";

const AccountSettings = () => {
    const user = useSelector(state => state.users.activeUser)

    const initialValues = user ? {
        avatar: null,
        full_name: user.full_name,
        phone: user.phone,
        status: user.status,
        custom_status: user.custom_status,
        location: user.location,
        instrument: user.instrument.id,
        genre: user.genre.id,
        age: user.age,
        skill_level: user.skill_level,
        youtube_ids: user.youtube_ids ? user.youtube_ids.split(',') : [],

        vk: user.vk ? `vk.com/${user.vk}` : '',
        instagram: user.instagram ? `instagram.com/${user.instagram}/` : '',
        telegram: user.telegram ? `telegram.me/${user.telegram}` : '',
    } : {}

    return (
        user && usersServices.isAuthenticated()
            ? <>
                <Profile.Header>
                    <Profile.AvatarArea>
                        <Avatar src={user.avatar}/>
                    </Profile.AvatarArea>
                    <Profile.Name
                        name={user.full_name}
                        status={user.status}
                        customStatus={user.custom_status}
                    />
                </Profile.Header>
                <UserForm
                    initialValues={initialValues}
                    onSubmit={usersServices.userUpdate}
                />
            </>
            : <Spinner/>
    )
}

export default AccountSettings