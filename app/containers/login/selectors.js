import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getLogin = createSelector(
    globalSelectors.getUi,
    ({login}) => login
)

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
export const getSigninInfoModalOpen = createGetSelector(getSigninSection, 'infoModalOpen')
export const getRegisterSection = createGetSelector(getLogin, 'registerSection')
export const getLoginLoaded = createGetSelector(getLogin, 'loaded')
