import React from 'react'
import usersServices from "../../redux/users/usersServices"
import UserForm from "./UserForm"


const initialValues = {
    avatar: null,
    full_name: '',
    phone: '',
    status: '0',
    custom_status: '',
    location: '0',
    instrument: '0',
    genre: '0',
    age: '0',
    skill_level: '0',
    password: '',
    youtube_ids: [],

    vk: '',
    instagram: '',
    telegram: '',
}

const validate = values => {
    const errors = {}
    if (values.password === '') errors.password = 'Введите пароль'
    return errors
}

const SignUp = () => {
    return (
        <UserForm
            initialValues={initialValues}
            onSubmit={usersServices.userSignUp}
            validate={validate}
        />
    )
}

export default SignUp