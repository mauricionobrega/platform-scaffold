import {createAction, wrapResponse} from '../../utils/utils'
import homeParser from './parsers/home'

export const receiveHomeContents = createAction('Received Home Contents')

export const fetchHomeContents = () => {
    return (dispatch) => {
        fetch('/')
            .then((response) => wrapResponse(response))
            .then(($wrappedResponseText) => {
                dispatch(receiveHomeContents(homeParser($wrappedResponseText)))
            })
    }
}

