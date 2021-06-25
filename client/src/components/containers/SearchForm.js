import React, {useEffect} from 'react'
import {Formik} from "formik";
import Form from "../ui/Form/Form";
import Select from "../ui/Select/Select";
import {CITIES} from "../../constants/cities";
import range from "../../helpers/range";
import {useSelector} from "react-redux";
import usersServices from "../../redux/users/usersServices";
import {useHistory} from "react-router";


const initialValues = {
    location: '0',
    instrument: '0',
    genre: '0',
    age: '0',
    skill_level: '0',
}

const SearchForm = () => {
    const activeFilters = useSelector(state => state.users.activeFilters)

    const history = useHistory()

    const instrumentList = useSelector(state => state.users.instrumentList)
    const genreList = useSelector(state => state.users.genreList)

    useEffect(() => {
        usersServices.instrumentListFetch()
        usersServices.genreListFetch()
    }, [])


    const onSubmit = values => {
        filterEvents(values)
        history.push('/search/results')
    }

    const filterEvents = (values) => {
        const filters = {}

        const single_fields = [
            'location', 'instrument', 'genre',
            'age', 'skill_level',
        ]

        single_fields.forEach(fieldName => {
            if (values[fieldName] && values[fieldName] !== '0') {
                filters[fieldName] = values[fieldName]
            }
        })

        usersServices.userListSetFilters(filters)
    }

    return (
        <>
            <Formik
                initialValues={{...initialValues, ...activeFilters}}
                onSubmit={values => onSubmit(values)}
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
                                <Select
                                    name={'location'}
                                    onChange={handleChange}
                                    value={values['location']}
                                    error={errors['location']}
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
                                    error={errors['instrument']}
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
                                    error={errors['genre']}
                                    touched={touched['genre']}
                                    multiple={true}
                                    items={genreList.map(item => ({value: item.id, label: item.name}))}
                                    defaultOption={'Жанр'}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    name={'age'}
                                    onChange={handleChange}
                                    value={values['age']}
                                    error={errors['age']}
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
                                    error={errors['skill_level']}
                                    touched={touched['skill_level']}
                                    items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => ({value: item, label: item}))}
                                    defaultOption={'Уровень игры'}
                                />
                            </Form.Item>
                            <Form.Button>Показать результаты</Form.Button>
                        </Form.Container>
                    )
                }
            </Formik>
        </>
    )
}

export default SearchForm