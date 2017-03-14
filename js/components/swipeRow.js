import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TYPO, PRIMARY_COLORS, COLOR, Checkbox} from 'react-native-material-design';

import SwipeableViews from 'react-swipeable-views-native';
// There is another version. I'm unsure which one give the best UX.
// import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';

export default class SwipeRow extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    text: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      state: props.state,
      checked: false
    }
  }

  handleChangeIndex = (newindex, fromindex) => {
    getSwipeAction = (newIndex, oldIndex) => {
      if (oldIndex > newindex) {
        return "done"
      } else if (oldIndex < newindex) {
        return "defer"
      } else {
        return "active"
      }
    };
    const swipeAction = getSwipeAction(newindex, this.state.index);
    this.setState({
      state: swipeAction,
      index: newindex,
    });
  };

  onCheck = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render () {
    return (
      <SwipeableViews
        onChangeIndex={this.handleChangeIndex}
        style={styles.swipeContainer}
        resistance={true}
        index={this.state.index}
      >
        <View style={[styles.slide, styles.slide1]}>
          <View style={styles.slideContent}>
            <Text style={styles.primaryText}>
              Swiped {this.props.title} {this.state.state}
            </Text>
          </View>
          <View style={styles.rightIcon}>
              <Icon name="md-checkmark" size={24} />
          </View>
        </View>
        <View style={[styles.slide, styles.slide2]}>
          <View style={styles.leftIcon}>
            <Checkbox
                value={1}
                onCheck={this.onCheck}
                checked={this.state.checked}
            />
          </View>
          <View style={styles.slideContent}>
            <Text style={styles.primaryText}>
              {this.props.title}
            </Text>
          </View>
        </View>
        <View style={[styles.slide, styles.slide3]}>
          <Text style={styles.primaryText}>
            Swiped {this.props.title} {this.state.state}
          </Text>
        </View>
      </SwipeableViews>
    )
  };
}

const styles = StyleSheet.create({
  swipeContainer: {
    height: 48
  },
  leftIcon: {
      width: 56,
      position: 'relative'
  },
  rightIcon: {
      width: 56,
      right: -20,
      position: 'relative'
  },
  slide: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  slideContent: {
    flex: 1
  },
  slide1: {
    backgroundColor: COLOR.paperGreen700.color,
  },
  slide2: {
    backgroundColor: '#FFFFFF',
  },
  slide3: {
    backgroundColor: COLOR.paperYellow500.color,
  },
  primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
  secondaryText: Object.assign({}, TYPO.paperFontBody1, {
      lineHeight: 22,
      fontSize: 14,
      color: 'rgba(0,0,0,.54)'
  }),
});
