import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';
import AuthSlice from '../Slices/AuthSlices';

const rootReducer = combineReducers({
    auth: AuthSlice,
    // chat: chatReducer,
});

export default withReduxStateSync(rootReducer);
