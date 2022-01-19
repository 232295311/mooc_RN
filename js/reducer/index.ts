import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
/**
 * 3.合并多个reducer
 */
const index = combineReducers({
  theme: theme,
  popular: popular,
});
export default index;
