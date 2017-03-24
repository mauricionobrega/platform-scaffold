import {createAction} from '../../utils/utils'
import {submitShipping as submitShippingCommand} from '../../integration-manager/checkout/commands'
import {getShippingFormValues} from '../../store/form/selectors'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')


export const submitShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const formValues = getShippingFormValues(currentState)
    return dispatch(submitShippingCommand(formValues))
}
