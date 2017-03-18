import Realm from 'realm'
import { ListView } from 'realm/react-native'
const uuid = require('uuid')

class TodoItem {
  static get () { return realm.objects(TodoItem.schema.name) }
  static schema = {
    name: 'TodoItem',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      value: {type: 'string'},
      completed: {type: 'string', default: 'active'},
      createdTimestamp: {type: 'date'},
      timeOfDay: {type: 'string', default: 'morning'}
    }
  }
}

export const todoItemDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

export const getTodoItems = () => {
  const todoItems = TodoItem.get().sorted('createdTimestamp', true)
  return todoItems
}

// export const getTodoItemsCompleted = () => {
//   const todoItems = TodoItem.get().sorted()
// }

export const getTodoItem = (id) => {
  const todoItem = realm.objectForPrimaryKey(TodoItem, id)
  return todoItem
}

export const updateTodoItem = (todoItem, value, completed) => {
  console.log(todoItem,value,completed)
  realm.write(() => {
    try {
      todoItem.value = value
      todoItem.completed = completed
    } catch (e) {
      console.warn(e)
    }
  })
}

export const createTodoItem = (value) => {
  realm.write(() => {
    realm.create(TodoItem.schema.name, {
      id: uuid.v1(),
      value,
      createdTimestamp: new Date()
    })
  })
}

export const deleteTodoItem = (todoItem) => {
  realm.write(() => {
    realm.delete(todoItem)
  })
}

const realm = new Realm({schema: [TodoItem]})
