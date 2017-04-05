import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveLoginPageData = createAction('Receive Login Page data')

export const setSigninLoaded = () => receiveLoginPageData({
    signinSection: {isFormLoaded: true}
})

export const setRegisterLoaded = () => receiveLoginPageData({
    registerSection: {isFormLoaded: true}
})
