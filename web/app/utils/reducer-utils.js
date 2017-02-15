import Immutable from 'immutable'
export const mergePayload = (state, {payload}) => state.mergeDeep(payload)

export const mergePayloadForActions = (...actions) => {
    const handlers = {}
    actions.forEach((action) => { handlers[action] = mergePayload })
    return handlers
}

const isList = Immutable.List.isList
export const listMerger = (a, b) => {
    if (a && a.mergeWith && !isList(a) && !isList(b)) {
        return a.mergeWith(listMerger, b)
    }
    return b
}
