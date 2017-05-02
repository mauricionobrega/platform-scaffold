import {receiveHomeData} from '../../results'

export const fetchHomeData = () => (dispatch) => {
    // Banners are being pulled from the bundle right now
    // so we just need an array with the correct number of objects
    return new Promise(() => {
        return dispatch(receiveHomeData({banners: [{}, {}, {}]}))
    })
}
