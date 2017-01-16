import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getHome = createSelector(
    globalSelectors.getUi,
    ({home}) => home
)

export const getHomeBanners = createGetSelector(getHome, 'banners')
export const getHomeCategories = createGetSelector(getHome, 'categories')
