import Immutable from 'immutable'
import {createGetSelector} from '../utils/selector-utils'

export const getUi = ({ui}) => ui

export const getModals = ({modals}) => modals
export const getModal = (modalName) => createGetSelector(getModals, modalName, Immutable.Map())
export const isModalOpen = (modalName) => createGetSelector(getModal(modalName), 'isOpen', false)

export const getCategories = ({categories}) => categories
export const getProducts = ({products}) => products
export const getCart = ({cart}) => cart
export const getCheckout = ({checkout}) => checkout
export const getForm = ({form}) => form
