import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @returns
 */
export function onLoadPopularData(
  storeName: any,
  url: string,
  pageSize: number | string,
) {
  return (dispatch: Function) => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore
      .fetchData(url) //异步action与数据流
      .then(data => {
        handleData(dispatch, storeName, data, pageSize);
      })
      .catch(e => {
        console.log(e);
        dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName, e});
      });
  };
}

/**
 * 处理上滑加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMorePopular(
  storeName: string,
  pageIndex: any,
  pageSize: any,
  dataArray = [],
  callBack: any,
) {
  return (dispatch: Function) => {
    setTimeout(() => {
      //模拟网络请求
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        // 已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        });
      } else {
        // 本次可载入的最大数量
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex;
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
}

/**
 * 处理下滑刷新和第一次进入页面获取数据
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
function handleData(
  dispatch: Function,
  storeName: any,
  data: any,
  pageSize: any,
) {
  //   console.log(data && data.data && data.data.item);
  let fixItems = [];
  if (data) {
    fixItems = data;
  }
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    items: fixItems,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
    storeName,
    pageIndex: 1,
  });
}
