import React from 'react'
import {Link} from "react-router-dom"
import cls from './LinkButton.module.scss'

const LinkButton = ({to, children}) => {
    return (
        <Link to={to} className={cls.box}>
            {children}
        </Link>
    )
}

export default LinkButton