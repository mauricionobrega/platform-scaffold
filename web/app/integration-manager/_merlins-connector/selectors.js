import {createGetSelector} from 'reselect-immutable-helpers'

export const getIntegrationManager = ({integrationManager}) => integrationManager
export const getCustomerEntityID = createGetSelector(getIntegrationManager, 'customerEntityID', '')
export const getFormKey = createGetSelector(getIntegrationManager, 'formKey')
export const getLoginHref = createGetSelector(getIntegrationManager, 'loginHref')
export const getRegisterHref = createGetSelector(getIntegrationManager, 'registerHref')
