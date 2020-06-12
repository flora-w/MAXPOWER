import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../appReducer';
import rootSaga from '../appSagas';

export default function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
