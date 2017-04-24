// import * as constants from './constants'
import * as utils from '../../utils/utils'

export const toggleHeader = utils.createAction('Toggled the header', 'isCollapsed')

export const openSearch = utils.createAction('Open header search', 'searchIsOpen')
export const closeSearch = utils.createAction('Close header search', 'searchIsOpen')
