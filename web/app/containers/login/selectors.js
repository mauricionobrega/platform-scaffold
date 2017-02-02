import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'
import fromPairs from 'lodash.frompairs'

export const getLogin = createSelector(getUi, ({login}) => login)

export const getLoginTitle = createGetSelector(getLogin, 'title')

export const getSigninSection = createGetSelector(getLogin, 'signinSection')
export const getRegisterSection = createGetSelector(getLogin, 'registerSection')

const sectionKeys = [
    ['getDescription', 'description'],
    ['getHeading', 'heading'],
    ['getRequiredText', 'requiredText'],
    ['getFormInfo', 'form']
]

const makeSelectorsFrom = (selector, keys) => fromPairs(
    keys.map(([funcName, key]) => [funcName, createGetSelector(selector, key)])
)

export const signin = makeSelectorsFrom(getSigninSection, sectionKeys)

export const getSigninFormFields = createGetSelector(signin.getFormInfo, 'fields')
export const getSigninFormHref = createGetSelector(signin.getFormInfo, 'href')
export const getSigninFormSubmitText = createGetSelector(signin.getFormInfo, 'submitText')
export const getSigninFormForgotPassword = createGetSelector(signin.getFormInfo, 'forgotPassword')


export const register = makeSelectorsFrom(getRegisterSection, sectionKeys)

export const getRegisterFormSections = createGetSelector(register.getFormInfo, 'sections')
export const getRegisterFormHref = createGetSelector(register.getFormInfo, 'href')
export const getRegisterFormSubmitText = createGetSelector(register.getFormInfo, 'submitText')
export const getLoginLoaded = createGetSelector(getLogin, 'loaded')
