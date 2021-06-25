import React from 'react';
import cls from './Title.module.scss'

const Title = ({marginBottom = 0, children}) => {
    return (
        <h1 className={cls.box} style={{marginBottom: marginBottom}}>
            {children}
        </h1>
    );
};

export default Title;