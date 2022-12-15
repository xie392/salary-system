import { Navigate } from "react-router-dom"
import React, { lazy } from "react"
import { Spin } from 'antd'

import Layout from "@/views/layout/layout"
import Loss from "@/views/404/404"
import Login from "@/views/login/login"

const Employees = lazy(() => import("@/views/employees/employees"))
const Department = lazy(() => import("@/views/department/department"))
const Salary = lazy(() => import("@/views/salary/salary"))
const Attendance = lazy(() => import("@/views/attendance/attendance"))
const Jobs = lazy(() => import("@/views/jobs/jobs"))
const User = lazy(() => import("@/views/user/user"))


// Loading组件
const Loading = () => <div className='loading'><Spin size="large" /></div>

// 懒加载
const LazyRouter = (element: JSX.Element) => <React.Suspense fallback={<Loading />}>{element}</React.Suspense>

const routers = [
  {
    path: "/login",
    name: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/employees" />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/employees",
        name: "employees",
        element: LazyRouter(<Employees />),
      },
      {
        path: "/attendance",
        name: "attendance",
        element: LazyRouter(<Attendance />),
      },
      {
        path: "/jobs",
        name: "jobs",
        element: LazyRouter(<Jobs />)
      },
      {
        path: "/department",
        name: "department",
        element: LazyRouter(<Department />),
      },
      {
        path: "/salary",
        name: "salary",
        element: LazyRouter(<Salary />),
      },
      {
        path: "/user",
        name: "user",
        element: LazyRouter(<User />),
      }
    ]
  },
  {
    path: "/*",
    name: "404",
    element: LazyRouter(<Loss />),
  }
]

export default routers