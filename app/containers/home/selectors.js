import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getHome = createSelector(
    globalSelectors.getUi,
    ({home}) => home
)

export const getHomeBanners = createSelector(
    getHome,
    (home) => home.get('banners')
)

export const getHomeCategories = createSelector(
    getHome,
    (home) => home.get('categories')
)
