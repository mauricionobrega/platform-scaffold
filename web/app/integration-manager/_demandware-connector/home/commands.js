import {receiveHomeData} from '../../responses'
import {initDemandWareSession, fetchNavigationData} from '../app/commands'

export const fetchHomeData = () => (dispatch) => {
    return initDemandWareSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            // Banners are being pulled from the bundle right now
            // so we just need an array with the correct number of objects
            dispatch(receiveHomeData({banners: [{}, {}, {}]}))
        })
}
