import Immutable from 'immutable'
export const mergePayload = (state, {payload}) => state.mergeDeep(payload)

export const mergePayloadForActions = (...actions) => {
    const handlers = {}
    actions.forEach((action) => { handlers[action] = mergePayload })
    return handlers
}

const isList = Immutable.List.isList
// Ensures the new list is always used when merging Maps that contain lists
// Otherwise we would end up with something like this:
// for a = {test: [1, 2, 3]}, b = {test: [1, 2]}
// a.mergeDeep(b) => {test: [1, 2, 3]}
// Based on: https://github.com/facebook/immutable-js/issues/762
export const mergeSkipLists = (a, b) => {
    if (a && a.mergeWith && !isList(a) && !isList(b)) {
        return a.mergeWith(listMerger, b)
    }
    return b
}
