import axios from "axios";
import { getCookie, removeCookie } from "./auth";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom"


const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
})


service.interceptors.request.use(
  (config: any) => {

    const isToken = (config.headers || {}).isToken === false;
    if (getCookie('TOKEN') && !isToken) {
      config.headers["Authorization"] = "Bearer " + getCookie('TOKEN');
    }

    return config;
  },
  (error: any) => Promise.reject(error)

)

service.interceptors.response.use(
  (response: any) => {

    const code = response.data.code || 200;

    if (code === 401) {
      removeCookie('TOKEN')
      Modal.confirm({
        centered: true,
        title: '您的登录时间已过期',
        content: '您可以继续停留在该页面,也可以点击确认去登录',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          location.href = "/login";
        }
      });
    }


    return response.data;
  },
  (error: any) => Promise.reject(error)
)

export default service;
