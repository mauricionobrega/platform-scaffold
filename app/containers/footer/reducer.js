import Immutable from 'immutable'
import {createReducer} from 'redux-act'
import * as appActions from '../app/actions'
import * as footerActions from './actions'
import * as parser from './parsers/parser'
import * as constants from './constants'

export const initialState = Immutable.fromJS({
    newsletter: null,
    navigation: new Array(5).fill({
        title: null,
        href: null
    }),
    signupStatus: constants.SIGNUP_NOT_ATTEMPTED
})

const footer = createReducer({

    [appActions.onPageReceived]: (state, action) => {
        const {$response} = action
        return state.merge(Immutable.fromJS({
            newsletter: parser.parseNewsLetter($response),
            navigation: parser.parseNavigation($response),
        }))
    },

    [footerActions.newsletterSignupComplete]: (state, action) => {
        return state.set('signupStatus', action.signupStatus)
    },

}, initialState)


export default footer
