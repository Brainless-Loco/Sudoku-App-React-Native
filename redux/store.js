import { createStore , combineReducers} from 'redux';
import Playzone_reducers from './reducers/Playzone_reducers';

const store = createStore (Playzone_reducers)
export default store