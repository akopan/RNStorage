import React, {Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import { ListView } from 'realm/react-native'
import SwipeRow from '../components/swipeRow.js'

export default class App extends Component {
  state = {textInput: ''}
  _onSubmit (e) {
    const {createTodoItem} = this.props
    console.log(createTodoItem)
    if (e && e.nativeEvent.text.trim().length > 0) {
      createTodoItem(e.nativeEvent.text.trim())
    }
    this.setState({textInput: ''})
  }

  handleSwipeAction = (start,end,todoItem) => {
    // console.log(this.props)
    const {updateTodoItem} = this.props
    const {getTodoItem} = this.props
    // console.warn(start);
    // console.warn(end);
    if (start > end) {
      _state = "done"
    } else if (start < end) {
      _state = "defer"
    } else {
      _state = "active"
    }
    console.log("State: "+_state)
    updateTodoItem(getTodoItem(todoItem.index).data, todoItem.text, _state)
  }
  renderRow(todoItem) {
    // console.log(todoItem);
    if (todoItem.completed == 'active') {
      return (
        <View>
          <View style={styles.row}>
            <SwipeRow
              index={todoItem.id}
              title={todoItem.value}
              text={todoItem.value}
              state={todoItem.completed}
              onSwipe={this.handleSwipeAction}
            />
          </View>
        </View>
      );
    } else {
      // return null;
      return (
        <View>
          <View style={styles.row}>
            <Text>{todoItem.value} is done!</Text>
          </View>
        </View>
      );
    }
  }

// onPress={() => deleteTodoItem(todoItem)}
  render () {
    // console.log(this.props)
    const {dataSource, deleteTodoItem, getTodoItem} = this.props
    const {textInput} = this.state
    // console.log(dataSource);
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          blurOnSubmit={false}
          style={styles.textInput}
          onSubmitEditing={(e) => this._onSubmit(e)}
          value={textInput}
          onChange={(event) => this.setState({textInput: event.nativeEvent.text})} />
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}
// <SwipeRow
//           index={1}
//           title={'title'}
//           text={'text'}
//           state={'state'}
//         />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 12,
    paddingHorizontal: 12
  },
  row: {
    borderBottomWidth: 0,
    padding: 0,
    justifyContent: 'space-between'
  }
})
