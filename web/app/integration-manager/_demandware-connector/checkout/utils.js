import {STATES} from './constants'
import {receiveCheckoutData} from './../../checkout/responses'

export const populateLocationsData = () => (dispatch) => {
    return dispatch(receiveCheckoutData({
        locations: {
            countries: [{value: 'us', label: 'United States'}],
            regions: STATES
        }
    }))
}
