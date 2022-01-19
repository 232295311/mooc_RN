import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
const Tab = createMaterialTopTabNavigator();

export function tabNav({Component, keys, theme, extra = ({} = {})}) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarItemStyle: styles.tabStyle,
        tabBarScrollEnabled: true, //是否支持 选择卡滚动
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: theme.themeColor, //TabBar的背景色
        },
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarLabelStyle: styles.labelStyle,
      }}>
      {Object.entries(_genTabs({Component, keys, theme, extra})).map(item => {
        return (
          <Tab.Screen
            key={item[0]}
            name={item[0]}
            component={item[1].screen}
            options={item[1].navigationOptions}
          />
        );
      })}
    </Tab.Navigator>
  );
}

function _genTabs({Component, keys, theme, extra = ({} = {})}) {
  const tabs = {};
  keys.forEach((item, index) => {
    if (item.checked) {
      tabs[`tab${index}`] = {
        screen: props => (
          <Component {...props} {...extra} tabLabel={item.name} theme={theme} />
        ),
        navigationOptions: {
          title: item.name,
        },
      };
    }
  });
  return tabs;
}

const styles = StyleSheet.create({
  tabStyle: {
    padding: 0,
  },
  //   指示器的样式
  indicatorStyle: {
    backgroundColor: 'white',
  },
  labelStyle: {
    textTransform: 'none',
    fontSize: 13,
    margin: 0,
  },
});
