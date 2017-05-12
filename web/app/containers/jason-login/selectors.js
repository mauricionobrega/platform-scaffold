import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getJasonLogin = createSelector(
    getUi,
    ({jasonLogin}) => jasonLogin
)

export const getForm = createGetSelector(getJasonLogin, 'form')
export const getFields = createGetSelector(getForm, 'fields', Immutable.List())
export const getHref = createGetSelector(getForm, 'href')


export const getTitle = createGetSelector(getJasonLogin, 'title', 'Test title')
export const getText = createGetSelector(getJasonLogin, 'text', Immutable.List())
