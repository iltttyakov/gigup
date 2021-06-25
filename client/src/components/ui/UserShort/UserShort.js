import React from 'react'
import cls from './UserShort.module.scss'
import Avatar from "../Avatar/Avatar"
import {Link} from "react-router-dom"

const getStatusText = (user) => {
    let statusText = ''

    if (user.status !== 'other') {
        statusText = user.status_display
    } else if (user.custom_status) {
        statusText = user.custom_status
    }

    return statusText
}

const UserShort = ({user}) => {

    return (
        <div className={cls.container}>
            <div className={cls.avatarArea}>
                <Avatar src={user.avatar} size={60}/>
            </div>
            <div className={cls.infoArea}>
                <h3 className={cls.name}>{user.full_name}</h3>
                <p className={cls.status}>{getStatusText(user)}</p>
            </div>
            <Link to={`/users/${user.id}`} className={cls.link}/>
        </div>
    )
}

export default UserShort