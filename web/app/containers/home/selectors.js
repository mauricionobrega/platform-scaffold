import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getHome = createSelector(getUi, ({home}) => home)

export const getHomeBanners = createGetSelector(getHome, 'banners')
export const getHomeCategories = createGetSelector(getHome, 'categories')
