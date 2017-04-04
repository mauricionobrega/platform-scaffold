import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getLogin = createSelector(getUi, ({login}) => login)

export const getSigninSection = createGetSelector(getLogin, 'signinSection')
export const getRegisterSection = createGetSelector(getLogin, 'registerSection')

export const signin = {
    getIsFormLoaded: createGetSelector(getSigninSection, 'isFormLoaded')
}

export const register = {
    getIsFormLoaded: createGetSelector(getRegisterSection, 'isFormLoaded')
}
