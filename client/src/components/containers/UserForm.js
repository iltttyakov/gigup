import React, {useEffect, useState} from 'react'
import {Formik} from "formik"
import Form from "../ui/Form/Form"
import FileInput from "../ui/FileInput/FileInput"
import Input from "../ui/Input/Input"
import Select from "../ui/Select/Select"
import {STATUSES} from "../../constants/statuses"
import {CITIES} from "../../constants/cities"
import range from "../../helpers/range"
import Button from "../ui/Button/Button"
import {useSelector} from "react-redux"
import usersServices from "../../redux/users/usersServices"
import Video from "../ui/Video/Video"


const defaultValidate = values => {
    const errors = {}

    if (values.full_name === '') errors.full_name = 'Заполните имя'
    if (values.phone === '') errors.phone = 'Введите номер телефона'
    if (values.phone.length < 18) errors.phone = 'Введите корректный номер телефона'
    if (values.status === '') errors.status = 'Введите номер телефона'
    if (values.status === null || values.status === '0') errors.status = 'Выберите статус'
    if (values.status === 'other' && values.custom_status === '') errors.custom_status = 'Введите статус'
    if (values.location === null || values.location === '0') errors.location = 'Выберите город'
    if (values.instrument === null || values.instrument === '0') errors.instrument = 'Выберите инструмент'
    if (values.genre === null || values.genre === '0') errors.genre = 'Выберите жанр'
    if (values.age === null || values.age === '0') errors.age = 'Выберите возраст'
    if (values.skill_level === null || values.skill_level === '0') errors.skill_level = 'Выберите уровень игры'

    return errors
}


const UserForm = (
    {
        initialValues,
        onSubmit,
        validate = () => ({})
    }
) => {
    const instrumentList = useSelector(state => state.users.instrumentList)
    const genreList = useSelector(state => state.users.genreList)
    const apiErrors = useSelector(state => state.users.userFormErrors)
    const inProcess = useSelector(state => state.users.userFormInProcess)

    const [avatar, setAvatar] = useState(null)
    const [videoList, setVideoList] = useState(initialValues['youtube_ids'])

    const handleValidate = values => {
        return {...defaultValidate(values), ...validate(values)}
    }

    const addVideo = () => {
        let result = prompt('Вставьте ссылку на youtube-видео', '')
        try {
            result = result.split('?v=')[1]
            result = result.split('&')[0]
            setVideoList([...videoList, result])
        } catch {
            alert('Не удалось получить видео, проверьте ссылку')
        }
    }

    const removeVideo = index => {
        const list = [...videoList]
        list.splice(index, 1)
        setVideoList(list)
    }

    useEffect(() => {
        usersServices.instrumentListFetch()
        usersServices.genreListFetch()
    }, [])

    const avatarChangeHandle = (event) => {
        setAvatar(event.currentTarget.files[0])
    }

    const getFormData = values => {
        const formData = new FormData()

        if (avatar) formData.append('avatar', avatar)
        if (videoList) formData.append('youtube_ids', videoList)

        const single_fields = [
            'full_name', 'phone', 'status', 'custom_status', 'location',
            'instrument', 'genre', 'age', 'skill_level', 'password',
        ]

        const link_fields = ['vk', 'instagram', 'telegram',]

        single_fields.forEach(fieldName => {
            if (values[fieldName] && values[fieldName] !== '0') {
                formData.append(fieldName, values[fieldName])
            } else {
                formData.append(fieldName, '')
            }
        })

        /** Поля, где воможно вставить ссылку **/
        link_fields.forEach(fieldName => {
            if (values[fieldName]) {
                const array = values[fieldName].split('/')
                let value = ''
                for (let i = array.length - 1; i >= 0; i--) {
                    if (array[i]) {
                        value = array[i]
                        break
                    }
                }
                formData.append(fieldName, value)
            } else {
                formData.append(fieldName, '')
            }
        })

        return formData
    }

    const handleSubmit = values => {
        const formData = getFormData(values)
        onSubmit(formData)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => handleSubmit(values)}
            validate={handleValidate}
        >
            {(
                {
                    handleChange,
                    handleBlur,
                    values,
                    handleSubmit,
                    errors,
                    touched
                }
            ) => (
                <Form.Container onSubmit={handleSubmit}>
                    <Form.Item>
                        <FileInput
                            name={'avatar'}
                            value={avatar}
                            onChange={avatarChangeHandle}
                            label={'Загрузить аватар'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder={'ФИО'}
                            type={'text'}
                            name={'full_name'}
                            onChange={handleChange}
                            value={values['full_name']}
                            error={[errors['full_name'], apiErrors['full_name']]}
                            touched={touched['full_name']}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder={'Номер телефона'}
                            type={'tel'}
                            name={'phone'}
                            onChange={handleChange}
                            value={values['phone']}
                            error={[errors['phone'], apiErrors['phone']]}
                            touched={touched['phone']}
                            mask={'+7 (999) 999-99-99'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            name={'status'}
                            onChange={handleChange}
                            value={values['status']}
                            error={[errors['status'], apiErrors['status']]}
                            touched={touched['status']}
                            items={STATUSES}
                            defaultOption={'Статус'}
                        />
                    </Form.Item>
                    {
                        values.status === 'other'
                            ? <Form.Item>
                                <Input
                                    placeholder={'Собственный статус'}
                                    type={'text'}
                                    name={'custom_status'}
                                    onChange={handleChange}
                                    value={values['custom_status']}
                                    error={[errors['custom_status'], apiErrors['custom_status']]}
                                    touched={touched['custom_status']}
                                />
                            </Form.Item>
                            : null
                    }
                    <Form.Item>
                        <Select
                            name={'location'}
                            onChange={handleChange}
                            value={values['location']}
                            error={[errors['location'], apiErrors['location']]}
                            touched={touched['location']}
                            items={CITIES.map(item => ({value: item, label: item}))}
                            defaultOption={'Город'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            name={'instrument'}
                            onChange={handleChange}
                            value={values['instrument']}
                            error={[errors['instrument'], apiErrors['instrument']]}
                            touched={touched['instrument']}
                            items={instrumentList.map(item => ({value: item.id, label: item.name}))}
                            defaultOption={'Инструмент'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            name={'genre'}
                            onChange={handleChange}
                            value={values['genre']}
                            error={[errors['genre'], apiErrors['genre']]}
                            touched={touched['genre']}
                            items={genreList.map(item => ({value: item.id, label: item.name}))}
                            defaultOption={'Жанр'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            name={'age'}
                            onChange={handleChange}
                            value={values['age']}
                            error={[errors['age'], apiErrors['age']]}
                            touched={touched['age']}
                            items={range(14, 100).map(item => ({value: item, label: item}))}
                            defaultOption={'Возраст'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            name={'skill_level'}
                            onChange={handleChange}
                            value={values['skill_level']}
                            error={[errors['skill_level'], apiErrors['skill_level']]}
                            touched={touched['skill_level']}
                            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => ({value: item, label: item}))}
                            defaultOption={'Уровень игры'}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder={'Пароль'}
                            type={'password'}
                            name={'password'}
                            onChange={handleChange}
                            value={values['password']}
                            error={[errors['password'], apiErrors['password']]}
                            touched={touched['password']}
                        />
                    </Form.Item>


                    <Form.Item>
                        <Input
                            placeholder={'VK'}
                            type={'text'}
                            name={'vk'}
                            onChange={handleChange}
                            value={values['vk']}
                            error={[errors['vk'], apiErrors['vk']]}
                            touched={touched['vk']}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder={'Instagram'}
                            type={'text'}
                            name={'instagram'}
                            onChange={handleChange}
                            value={values['instagram']}
                            error={[errors['instagram'], apiErrors['instagram']]}
                            touched={touched['instagram']}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder={'Telegram'}
                            type={'text'}
                            name={'telegram'}
                            onChange={handleChange}
                            value={values['telegram']}
                            error={[errors['telegram'], apiErrors['telegram']]}
                            touched={touched['telegram']}
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button onClick={addVideo}>Добавить видео</Button>
                    </Form.Item>
                    {
                        videoList.length
                            ? <Form.Item>
                                <Video.Row>
                                    {videoList.map(
                                        (videoId, index) => <Video.Item
                                            key={index}
                                            videoId={videoId}
                                            deleteHandle={() => removeVideo(index)}
                                        />
                                    )}
                                </Video.Row>
                            </Form.Item>
                            : null
                    }
                    <Form.Button disabled={inProcess}>
                        {
                            inProcess
                                ? '...'
                                : 'Сохранить'
                        }
                    </Form.Button>
                </Form.Container>
            )}
        </Formik>
    )
}

export default UserForm