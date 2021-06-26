import React from 'react'
import cls from './Profile.module.scss'
import Social from "../Social/Social";

export default {
    Header: ({children}) => <div className={cls.header}>{children}</div>,
    AvatarArea: ({children}) => <div className={cls.avatarArea}>{children}</div>,
    Name: ({name, status, customStatus, status_display = ''}) => {
        let statusText = ''

        if (status !== 'other') {
            statusText = status_display
        } else if (customStatus) {
            statusText = customStatus
        }

        return (
            <div className={cls.nameArea}>
                <h1 className={cls.name}>{name}</h1>
                <p className={cls.status}>{statusText}</p>
            </div>
        )
    },
    ControlsArea: ({children}) => <div className={cls.controlsArea}>{children}</div>,
    List: ({children}) => <ul className={cls.infoList}>{children}</ul>,
    Item: ({children}) => <li className={cls.infoItem}>{children}</li>,
    VideoArea: ({children}) => <div className={cls.videoArea}>{children}</div>,
    SocialList: ({children}) => <ul className={cls.socialList}>{children}</ul>,
    SocialItem: ({socialName, data}) => <li className={cls.socialItem}>
        {socialName}
        <Social socialName={socialName} data={data}/>
    </li>
}