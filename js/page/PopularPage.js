import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import keys from '../res/data/keys.json';
import {tabNav} from '../navigator/NavigationDelegate.js';
import NavigationBar from 'react-native-navbar-plus';
export default class Index extends Component {
  render() {
    let navigationBar = <NavigationBar title={'最热'} />;
    const TabNavigator = keys.length
      ? tabNav({Component: PopularTab, theme: {themeColor: '#2196f3'}, keys})
      : null;
    return (
      <View style={styles.container}>
        {navigationBar}
        {TabNavigator}
      </View>
    );
  }
}

class PopularTab extends Component {
  render() {
    const {tabLabel} = this.props;
    return <Text>{tabLabel}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
