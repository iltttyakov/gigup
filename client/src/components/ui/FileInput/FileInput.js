import React from "react";
import cls from './FileInput.module.scss'

const FileInput = ({value, name, label, onChange}) => (
    <>
        <div className={cls.container}>
            <label className={cls.label}>
                <span>{label}</span>
                <input
                    name={name}
                    style={{display: "none"}}
                    type={'file'}
                    onChange={onChange}
                />
            </label>
        </div>
        <span className={cls.fileName}>{value ? <div>Выбран файл: {value.name}</div> : null}</span>
    </>
);

export default FileInput;