import React from 'react';
import cls from './Logo.module.scss'

import logo from './logo.svg'

const Logo = () => {
    return (
        <div className={cls.box}>
            <img className={cls.img} src={logo}/>
            <span className={cls.label}>Gigup</span>
        </div>
    )
}

export default Logo;