import {createAction} from '../../utils/utils'

export const preloaderRemoved = createAction('Preloader Removed')

export const removePreloader = () => {
    return (dispatch) => {
        let preloaderNodes = document.getElementsByClassName('capture-remove')

        if (typeof preloaderNodes !== 'undefined') {
            for (let i = 0; i < preloaderNodes.length; i++) {
                preloaderNodes[i].parentNode.removeChild(preloaderNodes[i])
            }
        }

        dispatch(preloaderRemoved())
    }
}
