import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

// 去除默认样式
import "reset-css"

// 全局css
import "@/assets/style/global.scss"

// 状态管理
import { Provider } from "react-redux"
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'


import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
