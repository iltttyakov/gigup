import React from 'react';
import cls from './Avatar.module.scss'

import defaultAvatar from './default.jpg'

const Avatar = ({src, size = 100}) => {
    return (
        <div className={cls.container} style={{width: size, height: size}}>
            <img src={src || defaultAvatar} className={cls.img}/>
        </div>
    )
}

export default Avatar