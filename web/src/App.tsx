import { useState } from 'react'
import { Button } from 'antd'
// import routers from '@/router'
// import { useRoutes, Link } from "react-router-dom"
import BeforeRouter from './permission'

function App() {

  // const RouterView = useRoutes(routers)

  return (
    <div className="App">
      {/* {RouterView} */}
      <BeforeRouter />
    </div>
  )
}

export default App
