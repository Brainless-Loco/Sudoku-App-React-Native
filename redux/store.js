import { createStore , combineReducers} from 'redux';
import Grid_values_reducers from './reducers/Grid_values_reducers';

const store = createStore (Grid_values_reducers)
export default store