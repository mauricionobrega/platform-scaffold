export const mergePayload = (state, {payload}) => state.mergeDeep(payload)

export const mergeHandlersFor = (...actions) => {
    const handlers = {}
    actions.forEach((action) => { handlers[action] = mergePayload })
    return handlers
}
