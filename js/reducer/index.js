import {combineReducers} from 'redux';
import theme from './theme';

/**
 * 3.合并多个reducer
 */
const index = combineReducers({
  theme: theme,
});
export default index;
