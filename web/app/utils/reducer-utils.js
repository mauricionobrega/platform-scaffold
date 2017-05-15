/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
export const mergePayload = (state, {payload}) => state.mergeDeep(payload)

const isList = Immutable.List.isList
// Ensures the new list is always used when merging Maps that contain lists
// Otherwise we would end up with something like this:
// for a = {test: [1, 2, 3]}, b = {test: [1, 2]}
// a.mergeDeep(b) => {test: [1, 2, 3]}
// When we want it to return {test: [1, 2]} (ie. delete the third item)
// Based on: https://github.com/facebook/immutable-js/issues/762
export const mergeSkipLists = (a, b) => {
    if (a && a.mergeWith && !isList(a) && !isList(b)) {
        return a.mergeWith(mergeSkipLists, b)
    }
    return b
}
