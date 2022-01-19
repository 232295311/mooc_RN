import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import keys from '../res/data/keys.json';
import {tabNav} from '../navigator/NavigationDelegate.js';
import NavigationBar from 'react-native-navbar-plus';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation';
import actions from '../action';
import Toast from 'react-native-easy-toast';
import PopularItem from '../common/PopularItem';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const pageSize = 10;

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
  loadData(loadMore) {
    const {onLoadPopularData, onLoadMorePopular} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        callBack => {
          this.refs.toast.show('没有更多了');
        },
      );
    } else {
      onLoadPopularData(this.storeName, url, pageSize);
    }
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [], //要显示的数据
        hideLoadingMore: true, //默认隐藏加载更多
      };
    }
    return store;
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItem(data) {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {}}></PopularItem>;
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
    );
  }
  render() {
    let store = this._store();

    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>{tabLabel}</Text> */}
        <FlatList
          data={store.projectModes}
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
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            // 到达底部时调用
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {
                //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={
            //距离底部多远时 调用onEndReached
            0.5
          }
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页面调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----');
          }}
        />
        <Toast ref={'toast'} position={'center'} />
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
    onLoadPopularData: (storeName, url, pageSize) =>
      dispatch(actions.onLoadPopularData(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) =>
      dispatch(
        actions.onLoadMorePopular(
          storeName,
          pageIndex,
          pageSize,
          items,
          callBack,
        ),
      ),
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
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
