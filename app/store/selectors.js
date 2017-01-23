import {createSelector} from 'reselect'

export const getUi = ({ui}) => ui
export const getCatalog = ({catalog}) => catalog
export const getCatalogProducts = createSelector(
    getCatalog,
    ({products}) => products
)
export const getModals = ({modals}) => modals
export const getModal = (modalName) => createSelector(
    getModals,
    (modals) => modals.get(modalName, false)
)
