import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getCurrentPathKey} from '../../containers/app/selectors'
import {getSelectedCategory} from '../../containers/product-list/selectors'

export const changeSortOption = createAction('Change Sort Option')

export const changeSort = (sortValue) => (dispatch, getStore) => {
    const currentState = getStore()
    const categoryData = getSelectedCategory(currentState).toJS()
    categoryData.sort.options.forEach((option) => {
        option.selected = option.value === sortValue
    })
    const currentCategory = {[getCurrentPathKey(currentState)]: categoryData}
    dispatch(changeSortOption(currentCategory))
}
