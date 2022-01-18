import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../page/LoginPage';
import RegistrationPage from '../page/RegistrationPage';
import Homepage from '../page/HomePage';
import WebViewPage from '../page/WebViewPage';
import DetailPage from '../page/DetailPage';
import SortKeyPage from '../page/SortKeyPage';
import SearchPage from '../page/SearchPage';
import CustomKeyPage from '../page/CustomKeyPage';
import AboutKey from '../page/AboutPage';
import AboutMePage from '../page/AboutMePage';
import CodePushPage from '../page/CodePushPage';

const stack = createNativeStackNavigator();
// 在这里配置除Tab页以外的页面

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Screen
        name="loginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistrationPage"
        component={RegistrationPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Homepage"
        component={Homepage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebViewPage"
        component={WebViewPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SortKeyPage"
        component={SortKeyPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomKeyPage"
        component={CustomKeyPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutKey"
        component={AboutKey}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutMePage"
        component={AboutMePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CodePushPage"
        component={CodePushPage}
        options={{headerShown: false}}
      />
    </NavigationContainer>
  );
}
