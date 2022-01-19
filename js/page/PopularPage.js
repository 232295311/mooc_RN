import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
} from 'react-native';
import keys from '../res/data/keys.json';
import {tabNav} from '../navigator/NavigationDelegate.js';
import NavigationBar from 'react-native-navbar-plus';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation';
import actions from '../action';
import DataStore from '../expand/dao/DataStore';
// import {onLoadPopularData} from '../action/popular';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Index extends Component {
  render() {
    let navigationBar = <NavigationBar title={'最热'} />;
    const TabNavigator = keys.length
      ? tabNav({
          Component: PopularTabPage,
          theme: {themeColor: '#2196f3'},
          keys,
        })
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
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const {onLoadPopularData} = this.props;
    const url = this.genFetchUrl(this.storeName);
    // dispatch(actions)
    console.log('1231232131', onLoadPopularData);
    onLoadPopularData(this.storeName, url);
    // const url =
    //   'https://api.devio.org/uapi/popular?q=java&pageIndex=1&pageSize=25';
    // new DataStore().fetchData(url).then(data => {
    //   debugger;
    //   this.setState({
    //     showText: JSON.stringify(data),
    //   });
    //   console.log(data);
    // });
  }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItem(data) {
    const item = data.item;
    return (
      <View style={{marginBottom: 10}}>
        <Text style={{backgroundColor: '#faa'}}>{JSON.stringify(item)}</Text>
      </View>
    );
  }
  render() {
    const {popular} = this.props;
    let store = popular[this.storeName]; //动态获取store
    console.log('popular~~~~', popular);
    console.log('store~~~~~', store);
    if (!store) {
      store = {
        items: [],
        isLoading: false,
      };
    }
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>{tabLabel}</Text> */}
        <FlatList
          data={store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={'red'}
              colors={'yellow'}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={'green'}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    popular: state.popular,
  };
};
const mapDispatchToProps = dispatch => {
  // console.log('mapDispatchToProps', dispatch);
  return {
    onLoadPopularData: (storeName, url) =>
      dispatch(actions.onLoadPopularData(storeName, url)),
  };
};

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

// //将dispatch映射给onThemeChange，然后注入到组件的props中
// const mapDispatchToProps = dispatch => ({
//   onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
// });
// //包装 component，注入 dispatch到PopularTab
// const PopularTabPage = connect(null, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
