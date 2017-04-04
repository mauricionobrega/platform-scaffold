import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import fromPairs from 'lodash.frompairs'

export const getLogin = createSelector(getUi, ({login}) => login)

export const getSigninSection = createGetSelector(getLogin, 'signinSection')
export const getRegisterSection = createGetSelector(getLogin, 'registerSection')

const sectionKeys = [
    ['getFormInfo', 'form'],
    ['getIsFormLoaded', 'isFormLoaded']
]

export const signin = {
    getIsFormLoaded: createGetSelector(getSigninSection, 'isFormLoaded')
}

export const register = fromPairs(
    sectionKeys.map(([funcName, key]) => [funcName, createGetSelector(getRegisterSection, key)])
)

register.form = {
    getSections: createGetSelector(register.getFormInfo, 'sections')
}
