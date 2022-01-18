import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
export default class Index extends Component {
  render() {
    // 方便其他页面跳转的时候不传navigation 相当于初始化
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator></DynamicTabNavigator>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
});
