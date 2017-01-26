import {createAction} from '../../utils/utils'

export const receiveCategory = createAction('Receive Category Data')

export const receiveCategoryData = ({payload: {path, category}}) =>
    receiveCategory({[path]: category})
