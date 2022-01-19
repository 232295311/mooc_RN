import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import SafeAreaViewPlus from 'react-native-safe-area-plus';
import {connect} from 'react-redux';
class HomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    // 使用从store中注入的props
    const {theme} = this.props;
    // 方便其他页面跳转的时候不传navigation 相当于初始化
    NavigationUtil.navigation = this.props.navigation;
    return (
      <SafeAreaViewPlus topColor={theme}>
        <DynamicTabNavigator />
      </SafeAreaViewPlus>
    );
  }
}

//我们声明`HomePage`组件需要整个 store 中的哪一部分数据作为自己的 props
const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
  };
};

//包装 component，注入 state 到其默认的 connect(mapStateToProps)(HomePage) 中；
//这里用到了`connect`，我们将`mapStateToProps`作为参数传给`connect`，`connect`会返回一个生成组件函数，然后我们将App组件当做参数传给这个函数。
export default connect(mapStateToProps)(HomePage);
