import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

/**
 * 自定义中间件
 * @param store
 * @returns
 */

const logger = (store: any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());
  return result;
};

const middleware = [logger, thunk];

/**
 * 2. 创建store
 */
export default createStore(reducers, applyMiddleware(...middleware));
