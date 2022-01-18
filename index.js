/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import AsyncStorageDemoPage from './js/AsyncStorageDemoPage';
import FetchDemoPage from './js/FetchDemoPage.tsx';
import LoginPage from './js/page/LoginPage';

AppRegistry.registerComponent(appName, () => LoginPage);
