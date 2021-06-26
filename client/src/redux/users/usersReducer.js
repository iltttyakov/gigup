import {
    GENRE_LIST_FETCH_FINISH_ACTION,
    // GENRE_LIST_FETCH_START_ACTION,
    INSTRUMENT_LIST_FETCH_FINISH_ACTION,
    // INSTRUMENT_LIST_FETCH_START_ACTION,
    USER_FETCH_FINISH_ACTION,
    USER_FETCH_START_ACTION,
    USER_LIST_FETCH_FINISH_ACTION,
    USER_LIST_FETCH_START_ACTION,
    USER_LOGIN_SUCCESS_ACTION,
    USER_LOGIN_START_ACTION,
    USER_ME_ANONYMOUS_ACTION,
    USER_ME_FINISH_ACTION,
    USER_SIGN_UP_ERROR_ACTION,
    USER_SIGN_UP_START_ACTION,
    USER_SIGN_UP_SUCCESS_ACTION,
    USER_LOGIN_ERROR_ACTION,
    USER_ME_UPDATE_START_ACTION,
    USER_ME_UPDATE_SUCCESS_ACTION,
    USER_ME_UPDATE_ERROR_ACTION, USER_LIST_SET_FILTERS_ACTION, USER_ME_START_ACTION

} from '../actionTypes'

const initialState = {
    userFormErrors: [],
    userFormInProcess: false,

    userLoginFormErrors: null,
    userLoginFormInProcess: false,

    activeUser: null,

    instrumentList: [],
    genreList: [],

    userListFetchInProcess: false,
    userList: [],
    activeFilters: {},

    currentUser: null,
}


export default function usersReducer(state = initialState, action) {
    switch (action.type) {

        /** SIGN UP **/
        case USER_SIGN_UP_START_ACTION:
            return {...state, userFormErrors: [], userFormInProcess: true}

        case USER_SIGN_UP_SUCCESS_ACTION:
            return {...state, userFormInProcess: false}

        case USER_SIGN_UP_ERROR_ACTION:
            return {...state, userFormErrors: action.payload, userFormInProcess: false}
        /** END SIGN UP **/


        /** LOGIN **/
        case USER_LOGIN_START_ACTION:
            return {...state, userLoginFormErrors: null}

        // case USER_LOGIN_SUCCESS_ACTION:
        //     return {...state}

        case USER_LOGIN_ERROR_ACTION:
            return {...state, userLoginFormErrors: action.payload}
        /** END LOGIN **/


        /** ME **/
        case USER_ME_START_ACTION:
            return {...state, activeUser: null}

        case USER_ME_FINISH_ACTION:
            return {...state, activeUser: action.payload}

        case USER_ME_ANONYMOUS_ACTION:
            return {...state, activeUser: null}

        case USER_ME_UPDATE_START_ACTION:
            return {...state, userFormInProcess: true}

        case USER_ME_UPDATE_SUCCESS_ACTION:
            return {...state, userFormInProcess: false, activeUser: action.payload}

        case USER_ME_UPDATE_ERROR_ACTION:
            return {...state, userFormInProcess: false, userFormErrors: action.payload}
        /** END ME **/


        /** INSTRUMENT **/
        // case INSTRUMENT_LIST_FETCH_START_ACTION:
        //     return {...state}

        case INSTRUMENT_LIST_FETCH_FINISH_ACTION:
            return {...state, instrumentList: action.payload, instrumentListLoading: false}
        /** END INSTRUMENT **/


        /** GENRE **/
        // case GENRE_LIST_FETCH_START_ACTION:
        //     return {...state}

        case GENRE_LIST_FETCH_FINISH_ACTION:
            return {...state, genreList: action.payload, genreListLoading: false}
        /** END GENRE **/


        /** USER LIST **/
        case USER_LIST_SET_FILTERS_ACTION:
            return {...state, activeFilters: action.payload}

        case USER_LIST_FETCH_START_ACTION:
            return {...state, userList: [], userListFetchInProcess: true}

        case USER_LIST_FETCH_FINISH_ACTION:
            return {...state, userList: action.payload, userListFetchInProcess: false}
        /** END USER LIST **/


        /** USER SINGLE **/
        case USER_FETCH_START_ACTION:
            return {...state, currentUser: null}

        case USER_FETCH_FINISH_ACTION:
            return {...state, currentUser: action.payload}
        /** END USER SINGLE **/

        default:
            return state

    }
}