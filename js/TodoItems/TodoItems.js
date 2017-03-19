import React, {Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import { ListView } from 'realm/react-native'
import SwipeRow from '../components/swipeRow.js'
import {TYPO, PRIMARY_COLORS, COLOR, Checkbox} from 'react-native-material-design';

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
    const {updateTodoItem, getTodoItem} = this.props
    if (start < end) {
      _state = "done"
    } else if (start > end) {
      _state = "defer"
    } else {
      _state = "active"
    }
    console.log("State: "+_state)
    updateTodoItem(getTodoItem(todoItem.index).data, todoItem.text, _state)
    return _state;
  }
  renderRow(todoItem) {
    const { deleteTodoItem, updateTodoItem, getTodoItem } = this.props
    console.log(todoItem);
      // if (todoItem.completed == 'active') {
    return (
          <SwipeRow
            index={todoItem.id}
            title={todoItem.value}
            text={todoItem.value}
            state={todoItem.completed}
            onSwipe={this.handleSwipeAction}
          />
      );
      // } else {
        return (
          <View style={[styles.row]}>
            <Text
            style={[styles.primaryText]}
            onPress={() => updateTodoItem(getTodoItem(todoItem.id).data, todoItem.value, 'active')}>
              {todoItem.value} is in state {todoItem.completed}
            </Text>
          </View>
        );
      // }
  }

// onPress={() => deleteTodoItem(todoItem)}
  render () {
    // console.log(this.props)
    const {
      dataSourceAll,
      dataSourceDone,
      dataSourceActive,
      deleteTodoItem,
      getTodoItem
    } = this.props
    const {textInput} = this.state
    // console.log(dataSource);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>DoitDoit</Text>
        <TextInput
          blurOnSubmit={false}
          style={styles.textInput}
          onSubmitEditing={(e) => this._onSubmit(e)}
          value={textInput}
          onChange={(event) => this.setState({textInput: event.nativeEvent.text})} />
        <ListView
          dataSource={dataSourceActive}
          renderRow={this.renderRow.bind(this)}
        />
        <Text style={styles.smHeader}>Done Items</Text>
        <ListView
          dataSource={dataSourceDone}
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
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  header: {
    height: 50,
    alignSelf: 'stretch',
    color: 'white',
    fontSize: 30,
    backgroundColor: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  smHeader: {
    height: 40,
    alignSelf: 'stretch',
    color: 'white',
    fontSize: 25,
    backgroundColor: 'grey',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  textInput: {
    height: 50,
    alignSelf: 'stretch',
    // borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
})
