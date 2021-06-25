import React from 'react'
import cls from './SubTitle.module.scss'

const SubTitle = ({children}) => {
    return (
        <p className={cls.box}>{children}</p>
    )
}

export default SubTitle