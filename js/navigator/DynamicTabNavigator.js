import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';

import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();
const TABS = {
  // 在这里配置页面的路由
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      headerShown: false,
      tabBarIcon: ({colors, focused}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{color: colors}} />
      ),
    },
  },

  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      headerShown: false,
      tabBarIcon: ({colors, focused}) => (
        <Ionicons name={'md-trending-up'} size={26} style={{color: colors}} />
      ),
    },
  },

  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      headerShown: false,
      tabBarIcon: ({colors, focused}) => (
        <MaterialIcons name={'favorite'} size={26} style={{color: colors}} />
      ),
    },
  },

  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      headerShown: false,
      tabBarIcon: ({colors, focused}) => (
        <Entypo name={'user'} size={26} style={{color: colors}} />
      ),
    },
  },
};

class DynamicTabNavigator extends Component {
  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}; //根据需要定制显示的tab
    // PopularPage.navigationOptions.tabBarLabel = '最热1'//动态改变Tab属性
    const themeColor = this.props.theme.themeColor || this.props.theme;
    console.log('导航栏', themeColor);
    const a = this.props;
    console.log(a);
    return (
      <Tab.Navigator>
        {Object.entries(tabs).map(item => {
          return (
            <Tab.Screen
              key={item[0]}
              name={item[0]}
              component={item[1].screen}
              options={{
                ...item[1].navigationOptions,
                tabBarActiveTintColor: themeColor,
              }}
            />
          );
        })}
      </Tab.Navigator>
    );
  }
  render() {
    const Tab = this._tabNavigator();
    return Tab;
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
