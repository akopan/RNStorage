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

export const getTOD = () => {
  _curTime = new Date().getHours()
    if ( 0 < _curTime < 12 ) {
      return 'morning'
    }
    else if ( 12 < _curTime < 17 ) {
      return 'afternoon'
    }
    else if ( 17 < _curTime < 24 ) {
      return 'evening'
    }
}

// get todos by time of day
export const getTodoItemsByTOD = () => {
  const todoItemsTOD = TodoItem.get().filtered('timeOfDay = "'+getTOD()+'"')
  return todoItemsTOD
}

export const getTodoItemsCompleted = () => {
  const todoItemsCompleted = TodoItem.get().filtered('completed = "done"')
  return todoItemsCompleted
}

export const getTodoItemsActive = () => {
  const todoItemsCompleted = TodoItem.get().filtered('completed = "active"')
  return todoItemsCompleted
}

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
