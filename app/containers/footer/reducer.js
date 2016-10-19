import Immutable from 'immutable'
import * as appActions from '../app/actions'
import * as footerActions from './actions'
import * as parser from './parsers/parser'
import * as constants from './constants'

export const initialState = Immutable.fromJS({
    newsletter: null,
    navigation: null,
    signupStatus: constants.SIGNUP_NOT_ATTEMPTED
})


const footer = (state = initialState, action) => {
    switch (action.type) {
        case appActions.ON_PAGE_RECEIVED:
            return state.merge(Immutable.fromJS({
                newsletter: parser.parseNewsLetter(action.$response),
                navigation: parser.parseNavigation(action.$response),
            }))

        case footerActions.NEWSLETTER_SIGNUP_COMPLETE:
            return state.set('signupStatus', action.signupStatus)

        default:
            return state
    }
}


export default footer
