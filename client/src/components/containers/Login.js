import React from 'react'
import Form from "../ui/Form/Form"
import Input from "../ui/Input/Input"

import {Formik} from 'formik'
import usersServices from "../../redux/users/usersServices"
import {useSelector} from "react-redux";


const initialValues = {
    phone: '',
    password: '',
}

const validate = values => {
    const errors = {}

    if (values.phone === '') errors.phone = 'Введите номер телефона'
    if (values.phone.length < 18) errors.phone = 'Введите корректный номер телефона'
    if (values.password === '') errors.password = 'Введите пароль'

    return errors
}

const Login = () => {
    const apiErrors = useSelector(state => state.users.userLoginFormErrors)
    const userLoginFormInProcess = useSelector(state => state.users.userLoginFormInProcess)

    const onSubmit = values => {
        usersServices.userLogin(values.phone, values.password)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => onSubmit(values)}
            validate={validate}
        >
            {
                ({
                     handleChange,
                     handleBlur,
                     values,
                     handleSubmit,
                     errors,
                     touched
                 }) => (
                    <Form.Container onSubmit={handleSubmit}>
                        <Form.Item>
                            <Input
                                placeholder={'Номер телефона'}
                                type={'tel'}
                                name={'phone'}
                                onChange={handleChange}
                                value={values['phone']}
                                error={errors['phone']}
                                touched={touched['phone']}
                                mask={'+7 (999) 999-99-99'}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder={'Пароль'}
                                type={'password'}
                                name={'password'}
                                onChange={handleChange}
                                value={values['password']}
                                error={[
                                    errors['password'],
                                    apiErrors ? 'Неверный номер телефона или пароль' : null
                                ]}
                                touched={touched['password']}
                            />
                        </Form.Item>
                        <Form.Button disabled={userLoginFormInProcess}>Войти</Form.Button>
                    </Form.Container>
                )
            }
        </Formik>
    )
}

export default Login