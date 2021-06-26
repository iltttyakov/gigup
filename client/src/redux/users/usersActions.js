import {
    GENRE_LIST_FETCH_FINISH_ACTION,
    GENRE_LIST_FETCH_START_ACTION,
    INSTRUMENT_LIST_FETCH_FINISH_ACTION,
    INSTRUMENT_LIST_FETCH_START_ACTION,
    USER_FETCH_FINISH_ACTION,
    USER_LIST_FETCH_FINISH_ACTION,
    USER_LIST_FETCH_START_ACTION,
    USER_LOGIN_SUCCESS_ACTION,
    USER_LOGIN_START_ACTION,
    USER_ME_ANONYMOUS_ACTION,
    USER_ME_FINISH_ACTION,
    USER_ME_START_ACTION,
    USER_ME_UPDATE_SUCCESS_ACTION,
    USER_ME_UPDATE_START_ACTION,
    USER_SIGN_UP_SUCCESS_ACTION,
    USER_SIGN_UP_START_ACTION,
    USER_SIGN_UP_ERROR_ACTION,
    USER_LOGIN_ERROR_ACTION,
    USER_ME_UPDATE_ERROR_ACTION,
    USER_LIST_SET_FILTERS_ACTION, USER_FETCH_START_ACTION

} from '../actionTypes'
import createAction from "../createAction"
import api from "../../api/api"
import {dispatch} from "../store"
import axiosAPI from "../../api/services/axiosApi";


export const instrumentListFetchAction = () => {
    return async dispatch => {
        dispatch(createAction(INSTRUMENT_LIST_FETCH_START_ACTION))
        api.users.instrumentListFetch()
            .then(response => {
                dispatch(createAction(INSTRUMENT_LIST_FETCH_FINISH_ACTION, response.data))
            })
            .catch(error => console.log('Ошибка загрузки списка инструментов', error))
    }
}


export const genreListFetchAction = () => {
    return async dispatch => {
        dispatch(createAction(GENRE_LIST_FETCH_START_ACTION))
        api.users.genreListFetch()
            .then(response => {
                dispatch(createAction(GENRE_LIST_FETCH_FINISH_ACTION, response.data))
            })
            .catch(error => console.log('Ошибка загрузки жанров', error))
    }
}


export const userSignUpAction = data => {
    return async dispatch => {
        dispatch(createAction(USER_SIGN_UP_START_ACTION))
        api.users.signUp(data)
            .then(response => {
                dispatch(createAction(USER_SIGN_UP_SUCCESS_ACTION, response.data))
                setNewHeaders(response.data.tokens)
                window.location.href = '/'
            })
            .catch(error => {
                if (error.response) dispatch(createAction(USER_SIGN_UP_ERROR_ACTION, error.response.data))
                else console.log('Ошибка регистрации', error)
            })
    }
}


export const userMeUpdateAction = (data) => {
    return async dispatch => {
        dispatch(createAction(USER_ME_UPDATE_START_ACTION))
        api.users.userMeUpdate(data)
            .then(response => {
                dispatch(createAction(USER_ME_UPDATE_SUCCESS_ACTION, response.data))
            })
            .catch(error => {
                if (error.response) dispatch(createAction(USER_ME_UPDATE_ERROR_ACTION, error.response.data))
                else console.log('Ошибка обновления профиля', error)
            })
    }
}


export const userLoginAction = (phone, password) => {
    return async dispatch => {
        dispatch(createAction(USER_LOGIN_START_ACTION))
        api.users.login(phone, password)
            .then(response => {
                dispatch(createAction(USER_LOGIN_SUCCESS_ACTION, response.data))
                setNewHeaders(response.data)
                window.location.href = '/'
            })
            .catch(error => {
                if (error.response) dispatch(createAction(USER_LOGIN_ERROR_ACTION, error.response.data))
                else console.log('Ошибка авторизации', error)
            })
    }
}


export const userIsAuthenticated = () => api.users.isAuthenticated()


export const userMeAction = () => {
    return async dispatch => {
        dispatch(createAction(USER_ME_START_ACTION))
        api.users.me()
            .then(response => {
                dispatch(createAction(USER_ME_FINISH_ACTION, response.data))
            })
            .catch(error => {
                // console.log('USER_ME_ANONYMOUS_ACTION USER_ME_ANONYMOUS_ACTION USER_ME_ANONYMOUS_ACTION')
                // dispatch(createAction(USER_ME_ANONYMOUS_ACTION))
            })
    }
}


export const userLogoutAction = () => {
    dispatch(createAction(USER_ME_ANONYMOUS_ACTION))
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/'
}


export function userListFetchAction(filters = {}) {
    return async dispatch => {
        dispatch(createAction(USER_LIST_FETCH_START_ACTION, filters))
        api.users.userListFetch(filters)
            .then(response => {
                dispatch(createAction(USER_LIST_FETCH_FINISH_ACTION, response.data))
            })
            .catch(error => console.log('Ошибка поиска пользователей', error))
    }
}


export const userListSetFiltersAction = (filters = {}) => dispatch(createAction(USER_LIST_SET_FILTERS_ACTION, filters))


export function userFetchAction(id) {
    return async dispatch => {
        dispatch(createAction(USER_FETCH_START_ACTION))
        api.users.userFetch(id)
            .then(response => {
                dispatch(createAction(USER_FETCH_FINISH_ACTION, response.data))
            })
            .catch(error => console.log('Ошибка загрузки пользователей', error))
    }
}


export function setNewHeaders(data) {
    axiosAPI.defaults.headers['Authorization'] = 'JWT ' + data.access
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
}