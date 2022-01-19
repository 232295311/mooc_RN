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
    case Types.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], //java ios等
          items: action.items, //数据
          isLoading: false,
        },
      };
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], //java ios等
          isLoading: true,
        },
      };
    case Types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], //java ios等
          isLoading: false,
        },
      };
    default:
      return state;
  }
}
