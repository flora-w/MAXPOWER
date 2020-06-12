import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import invariant from 'redux-immutable-state-invariant';
import reducer from '../appReducer';
import rootSaga from '../appSagas';
import env from '../environments/environment';

export default function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger({ level: 'info', collapsed: true, diff: true });
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const middleware = [sagaMiddleware, logger];
  if (env.immutable) {
    middleware.push(invariant());
  }

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  sagaMiddleware.run(rootSaga);
  if (module.hot) {
    module.hot.accept('../appReducer', () => {
      store.replaceReducer(require('../appReducer').default);
    });
  }

  return store;
}
