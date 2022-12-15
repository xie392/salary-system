import React, { useState, useEffect } from 'react';
import { Menu } from "antd"
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserAddOutlined,
  ApartmentOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '@/utils/auth'



function menu(porps) {

  const location = useLocation();
  const navigate = useNavigate();

  let defaultKey: string = "";

  const items: MenuProps['items'] = [
    {
      key: '/',
      label: "员工管理",
      icon: React.createElement(UserOutlined),
      children: [
        {
          key: '/employees',
          label: "员工信息",
          icon: React.createElement(UserAddOutlined),
        },
        {
          key: '/attendance',
          label: "员工考勤",
          icon: React.createElement(ApartmentOutlined),
        },
      ]
    },
    {
      key: 'department',
      label: "薪资管理",
      icon: React.createElement(MoneyCollectOutlined),
      children: [
        {
          key: '/jobs',
          label: "岗位管理",
          icon: React.createElement(LaptopOutlined),
        },
        {
          key: '/salary',
          label: "薪资发放",
          icon: React.createElement(DollarOutlined),
        }
      ]
    },
    {
      key: 'system',
      label: "系统管理",
      icon: React.createElement(SettingOutlined),
      children: [
        {
          key: '/user',
          label: "用户管理",
          icon: React.createElement(TeamOutlined),
        }
      ]
    }
  ]

  // ❌ 假动态路由
  if (getCookie('uid') !== '1671077822301') {
    items.splice(2, 1)
  }

  // 解决刷新展开问题
  for (let i = 0; i < items.length; i++) {
    let isPath = items[i]!.children && items[i]!.children.some(item => item!.key === location.pathname);
    if (isPath) {
      defaultKey = items[i].key;
      break;
    };
  }

  // 默认展开
  const [openKeys, setOpenKeys] = useState([defaultKey]);

  // 手风琴效果
  const onOpenChange = (keys: string[]) => {
    setOpenKeys([keys.at(-1)])
  };

  // 菜单切换
  const navChange = ({ key }) => navigate(key);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={location.pathname}
      items={items}
      onOpenChange={onOpenChange}
      onClick={navChange}
      openKeys={openKeys}
    />
  );
}

export default menu;