import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
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

signin.form = makeSelectorsFrom(signin.getFormInfo, [
    ['getFields', 'fields'],
    ['getHref', 'href'],
    ['getSubmitText', 'submitText'],
    ['getForgotPassword', 'forgotPassword']
])

export const register = makeSelectorsFrom(getRegisterSection, sectionKeys)

register.form = makeSelectorsFrom(register.getFormInfo, [
    ['getSections', 'sections'],
    ['getHref', 'href'],
    ['getSubmitText', 'submitText']
])
