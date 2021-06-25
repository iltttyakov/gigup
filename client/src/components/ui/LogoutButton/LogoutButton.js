import React from 'react'
import cls from './LogoutButton.module.scss'
import usersServices from '../../../redux/users/usersServices'
import Button from "../Button/Button"

const LogoutButton = () => {
    return (
        <div className={cls.box}>
            <Button onClick={usersServices.userLogout}>
                Выйти
            </Button>
        </div>
    )
}

export default LogoutButton