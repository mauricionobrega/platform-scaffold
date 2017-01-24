import * as modalActions from '../../store/modals/actions'

export const openNavigation = () => modalActions.openModal('navigation')

export const closeNavigation = () => modalActions.closeModal('navigation')
