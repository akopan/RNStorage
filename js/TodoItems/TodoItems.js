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
    if (e && e.nativeEvent.text.trim().length > 0) {
      createTodoItem(e.nativeEvent.text.trim())
    }
    this.setState({textInput: ''})
  }

  handleSwipeAction = (start,end) => {
    console.warn(start);
    console.warn(end);
    if (oldIndex > newindex) {
      _state = "done"
    } else if (oldIndex < newindex) {
      _state = "defer"
    } else {
      _state = "active"
    }
  }
  renderRow(todoItem) {
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
  }

  render () {
    // console.log(this.handleSwipeAction(1,2))
    const {dataSource, deleteTodoItem} = this.props
    const {textInput} = this.state
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
          renderRow={(todoItem) =>
            <SwipeRow
              index={todoItem.id}
              title={todoItem.value}
              text={todoItem.value}
              state={todoItem.completed}
              onSwipe={this.handleSwipeAction}
            />
          }
        />
      </View>
    )
  }
}
// onPress={() => deleteTodoItem(todoItem)}
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
