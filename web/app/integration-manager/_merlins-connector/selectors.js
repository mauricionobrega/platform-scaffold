/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getIntegrationManager = ({integrationManager}) => integrationManager
export const getCustomerEntityID = createGetSelector(getIntegrationManager, 'customerEntityID', '')
export const getFormKey = createGetSelector(getIntegrationManager, 'formKey')
export const getIMProductDetailsByPathKey = (pathKey) => createGetSelector(getIntegrationManager, pathKey, Immutable.Map())
export const getUenc = (pathKey) => createGetSelector(getIMProductDetailsByPathKey(pathKey), 'uenc')
