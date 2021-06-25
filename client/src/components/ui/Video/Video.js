import React from 'react'
import cls from './Video.module.scss'
import YouTube from "react-youtube"


export default {
    Row: ({children}) => <div className={cls.row}>{children}</div>,
    Item: ({videoId, deleteHandle = null}) => <div className={cls.item}>
        <div className={cls.playerWrapper}><YouTube videoId={videoId} className={cls.video}/></div>
        {
            deleteHandle
                ? <button type={'button'} className={cls.deleteButton} onClick={deleteHandle}/>
                : null
        }
    </div>
}