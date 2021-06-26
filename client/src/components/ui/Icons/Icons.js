import React from 'react';
import IconsSVG from './sprite.svg';

const Icons = ({name, size, className, fill='', stroke='transparent'}) =>
    <svg className={className} fill={fill} stroke={stroke} width={size} height={size}>
        <use xlinkHref={`${IconsSVG}#${name}`}/>
    </svg>

export default Icons;