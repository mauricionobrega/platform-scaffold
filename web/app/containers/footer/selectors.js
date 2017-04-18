import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getFooter = createSelector(getUi, ({footer}) => footer)

export const getNewsletterSignupStatus = createGetSelector(getFooter, 'signupStatus')
