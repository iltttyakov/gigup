import React from 'react'
import cls from './PageHeader.module.scss'

const PageHeader = ({children}) => {
    return (
        <div className={cls.box}>
            {children}
        </div>
    )
}

export default PageHeader