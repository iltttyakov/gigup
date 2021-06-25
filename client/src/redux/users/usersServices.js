import {dispatch} from '../store'
import {
    genreListFetchAction,
    instrumentListFetchAction, userFetchAction,
    userIsAuthenticated,
    userListFetchAction, userListSetFiltersAction,
    userLoginAction,
    userLogoutAction,
    userMeAction,
    userMeUpdateAction,
    userSignUpAction
} from "./usersActions"

export default {
    instrumentListFetch: () => dispatch(instrumentListFetchAction()),
    genreListFetch: () => dispatch(genreListFetchAction()),
    userSignUp: data => dispatch(userSignUpAction(data)),
    userLogin: (phone, password) => dispatch(userLoginAction(phone, password)),
    userMe: () => dispatch(userMeAction()),
    userUpdate: data => dispatch(userMeUpdateAction(data)),
    userLogout: () => dispatch(userLogoutAction()),
    userListFetch: (filters = {}) => dispatch(userListFetchAction(filters)),
    userListSetFilters: (filters = {}) => dispatch(userListSetFiltersAction(filters)),
    userFetch: id => dispatch(userFetchAction(id)),
    isAuthenticated: () => userIsAuthenticated(),
}