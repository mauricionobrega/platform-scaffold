import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getLogin = createSelector(getUi, ({login}) => login)

export const getLoginTitle = createGetSelector(getLogin, 'title')
export const getSigninSection = createGetSelector(getLogin, 'signinSection')
export const getSigninSectionDescription = createGetSelector(getSigninSection, 'description')
export const getSigninSectionHeading = createGetSelector(getSigninSection, 'heading')
export const getSigninSectionRequiredText = createGetSelector(getSigninSection, 'requiredText')
export const getSigninFormInfo = createGetSelector(getSigninSection, 'form')
export const getSigninFormFields = createGetSelector(getSigninFormInfo, 'fields')
export const getSigninFormHref = createGetSelector(getSigninFormInfo, 'href')
export const getSigninFormSubmitText = createGetSelector(getSigninFormInfo, 'submitText')
export const getSigninFormForgotPassword = createGetSelector(getSigninFormInfo, 'forgotPassword')
export const getRegisterSection = createGetSelector(getLogin, 'registerSection')
export const getRegisterSectionDescription = createGetSelector(getRegisterSection, 'description')
export const getRegisterSectionHeading = createGetSelector(getRegisterSection, 'heading')
export const getRegisterSectionRequiredText = createGetSelector(getRegisterSection, 'requiredText')
export const getRegisterFormInfo = createGetSelector(getRegisterSection, 'form')
export const getRegisterFormSections = createGetSelector(getRegisterFormInfo, 'sections')
export const getRegisterFormHref = createGetSelector(getRegisterFormInfo, 'href')
export const getRegisterFormSubmitText = createGetSelector(getRegisterFormInfo, 'submitText')
export const getLoginLoaded = createGetSelector(getLogin, 'loaded')
