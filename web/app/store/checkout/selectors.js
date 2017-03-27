import {getCheckout} from '../../store/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'


export const getEmailAddress = createGetSelector(getCheckout, 'emailAddress')
