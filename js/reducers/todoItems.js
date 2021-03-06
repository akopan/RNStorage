const DEFAULT_STATE = {}

export default (state = DEFAULT_STATE, {type, payload} = {}) => {
  switch (type) {
    case 'TODO_ITEM_ADDED':
    case 'TODO_ITEM_DELETED':
    case 'TODO_ITEM_UPDATED':
      return {...state, lastModified: Date.now()}
    default:
      return state
  }
}
