import { getCookie } from '@/utils/auth'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import routers from '@/router'
import { useEffect } from 'react'

const ToLogin = (): React.FC => {

  const Navigate = useNavigate()

  useEffect(() => {
    Navigate('/login')
  }, [])

  return <div></div>
}

const ToPages = (): React.FC => {

  const Navigate = useNavigate()

  useEffect(() => {
    Navigate('/')
  }, [])


  return <div></div>
}


// 路由守卫
const BeforeRouter = (): React.FC => {

  const RouterView = useRoutes(routers)
  const Location = useLocation()

  const token = getCookie('TOKEN')


  if (Location.pathname === '/login' && token) {
    return <ToPages />

  }

  if (Location.pathname !== '/login' && !token) {
    return <ToLogin />
  }

  return RouterView

}

export default BeforeRouter
