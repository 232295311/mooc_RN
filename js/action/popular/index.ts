import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @returns
 */
export function onLoadPopularData(storeName: any, url: string) {
  return (dispatch: Function) => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore
      .fetchData(url) //异步action与数据流
      .then(data => {
        handleData(dispatch, storeName, data);
      })
      .catch(e => {
        console.log(e);
        dispatch({type: Types.LOAD_POPULAR_FAIL, storeName, e});
      });
  };
}

function handleData(dispatch: Function, storeName: any, data: any) {
  //   console.log(data && data.data && data.data.item);
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data,
    storeName,
  });
}
