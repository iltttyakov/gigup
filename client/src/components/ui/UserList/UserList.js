import React from 'react'
import cls from './UserList.module.scss'
import UserShort from "../UserShort/UserShort"

const UserList = ({items}) => {
    return (
        !items.length
            ? <span className={cls.notFound}>Никого не нашли</span>
            : <ul className={cls.list}>
                {items.map(
                    (item, index) => <li key={index} className={cls.item}>
                        <UserShort user={item}/>
                    </li>
                )}
            </ul>
    )
}

export default UserList