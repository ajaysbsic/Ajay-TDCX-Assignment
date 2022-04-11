import { createStore, applyMiddleware,compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas";
import reducers from "../redux";

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;