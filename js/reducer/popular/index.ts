import Types from '../../action/types';

const defaultState = {};

/**
 * popular:{
 *      java:{
 *          items:[],
 *          isLoading:false
 *      },
 *      ios:{
 *          items:[],
 *          isLoading:false
 *      }
 * }
 * 0. state树，横向扩展
 * 1. 如何动态地设置store，和动态获取store（难点：store  key不固定）
 * @param state
 * @param action
 * @returns
 */
export default function onAction(state = defaultState, action: any) {
  console.log('进来popular onAction', state, action);
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS: //刷新成功
      return {
        ...state,
        [action.storeName]: {
          //@ts-ignore
          ...state[action.storeName], //java ios等
          items: action.items, //原始数据
          projectModes: action.projectModes, //此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };
    case Types.POPULAR_REFRESH: //刷新
      return {
        ...state,
        [action.storeName]: {
          //@ts-ignore
          ...state[action.storeName], //java ios等
          isLoading: true,
          hideLoadingMore: true,
        },
      };
    case Types.POPULAR_REFRESH_FAIL: //刷新失败
      return {
        ...state,
        [action.storeName]: {
          //@ts-ignore
          ...state[action.storeName], //java ios等
          isLoading: false,
        },
      };
    case Types.POPULAR_LOAD_MORE_SUCCESS: //加载更多成功
      return {
        ...state,
        [action.storeName]: {
          //@ts-ignore
          ...state[action.storeName], //java ios等
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
          isLoading: false,
        },
      };

    case Types.POPULAR_LOAD_MORE_FAIL: //加载更多失败 即 滑到底部了
      return {
        ...state,
        [action.storeName]: {
          //@ts-ignore
          ...state[action.storeName], //java ios等
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        },
      };

    default:
      return state;
  }
}
