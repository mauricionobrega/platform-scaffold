import {createSelector} from 'reselect'

export const getUi = ({ui}) => ui
export const getCatalog = ({catalog}) => catalog
export const getCatalogProducts = createSelector(
    getCatalog,
    ({products}) => products
)
