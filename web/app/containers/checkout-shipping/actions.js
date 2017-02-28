import {createAction} from '../../utils/utils'
import CheckoutShipping from './container'
import {addNotification, fetchPage, removeAllNotifications} from '../app/actions'
import {getShippingFormValues} from '../../store/form/selectors'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')
