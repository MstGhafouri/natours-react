import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middlewares = [thunk];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(reducers, composedEnhancer);

export const persistor = persistStore(store);

export default { store, persistor };
