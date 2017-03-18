import store from '../store'

export const createTodoItem = (todoText) => {
  store.createTodoItem(todoText)
  return {
    type: 'TODO_ITEM_ADDED'
  }
}

export const deleteTodoItem = (todoItem) => {
  store.deleteTodoItem(todoItem)
  return {
    type: 'TODO_ITEM_DELETED'
  }
}

export const updateTodoItem = (todoItem, value, completed) => {
	store.updateTodoItem(todoItem, value, completed)
	return {
		type: 'TODO_ITEM_UPDATED'
	}
}

export const getTodoItem = (id) => {
	return {
		type: 'TODO_ITEM_GET',
		data: store.getTodoItem(id)
	}
}