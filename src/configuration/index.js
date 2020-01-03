import { combineReducers } from 'redux';
import { CommonReducer} from '../store/commonReducer'
const appReducers = combineReducers({
    common : CommonReducer
});

export default appReducers;
