import {createAction} from '../../utils/utils'
// import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
// import miniCartParser from './mini-cart-parser'

// export const receiveContents = createAction('Received MiniCart Contents')

export const openMiniCart = createAction('Open navigation')
export const closeMiniCart = createAction('Close navigation')

// export const receiveResponse = (response) => {
//     return (dispatch) => {
//         jqueryResponse(response)
//             .then(([$, $responseText]) => {
//                 dispatch(receiveContents(miniCartParser($, $responseText)))
//             })
//     }
// }
//
// export const fetchContents = () => {
//     return (dispatch) => {
//         makeRequest(window.location.href)
//             .then((response) => dispatch(receiveResponse(response)))
//     }
// }
