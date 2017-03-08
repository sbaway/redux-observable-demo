export default (initialState, handlers) =>
  (state = initialState, action) => {
    const handle = handlers[action.type]
    if (!handle) {
      return state
    }
    state = handle(state, action)
    return state
  }

