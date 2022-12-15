import reducer from "./reducer.ts"
import { applyMiddleware, legacy_createStore, compose, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import user from './user/reducer'

//在localStorge中生成key为root的值
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["user"],
  // blacklist: ['']  //设置某个reducer数据不持久化，
}

// 如多个模合并
const reducer = combineReducers({
  user
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const PersistReducer = persistReducer(persistConfig, reducer)

const store = legacy_createStore(PersistReducer, composeEnhancers(applyMiddleware(thunk)))

const persistor = persistStore(store)



// const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

// export default store

export {
  store,
  persistor
}