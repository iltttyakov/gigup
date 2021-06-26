import React from 'react'
import cls from './Container.module.scss'

const Container = ({className = '', children}) => {
    return (
        <div className={[cls.box, className].join(' ')}>
            {children}
        </div>
    )
}

export default Container