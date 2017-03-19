import {connect} from 'react-redux'
import store from '../store'
import * as actions from './actions'
import TodoItems from './TodoItems'
import {getTodoItems} from '../reducers'

// Realm.Results is auto-updating, therefore no need to re-fetch the data
const todoItemsResults = store.getTodoItems()
const todoItemsActive = store.getTodoItemsActive()
const todoItemsDone = store.getTodoItemsCompleted()

const mapStateToProps = (state, props) => ({
  ...getTodoItems(state),
  dataSourceAll: store.todoItemDS.cloneWithRows(todoItemsResults),
  dataSourceDone: store.todoItemDS.cloneWithRows(todoItemsDone),
  dataSourceActive: store.todoItemDS.cloneWithRows(todoItemsActive),

})

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItems)
