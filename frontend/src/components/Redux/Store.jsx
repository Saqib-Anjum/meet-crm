import { configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener, initStateWithPrevTab } from 'redux-state-sync';
import rootReducer from './Reducers/RootReducer';

const config = {
    // blacklist actions that shouldn’t be synced
    blacklist: [],
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        createStateSyncMiddleware(config),
    ],
});

initMessageListener(store);

initStateWithPrevTab(store);
export default store;

