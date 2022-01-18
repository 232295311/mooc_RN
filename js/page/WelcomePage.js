import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {getBoarding} from '../utils/BoardingUtil';
export default class Index extends Component {
  componentDidMount() {
    this.doLaunch();
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  async doLaunch() {
    const boarding = await getBoarding();
    const {navigation} = this.props;
    this.time = setTimeout(() => {
      if (boarding) {
        NavigationUtil.resetToHomePage({navigation});
      } else {
        NavigationUtil.resetToLoginPage({navigation});
      }
    }, 200);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
});
