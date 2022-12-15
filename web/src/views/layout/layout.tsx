import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Space, Modal, Form, Input, Button, message } from 'antd';
import styles from "./layout.module.scss"
import { Outlet } from 'react-router-dom';
import Menus from '@/component/menu/menu';
import type { MenuProps } from 'antd';
import { clearAllCookie, getCookie } from '@/utils/auth';
import { editUserPwd } from '@/api/user'

// import logo from "@/assets/logo.png"

const { Header, Sider, Content } = Layout;

const items: MenuProps['items'] = [
  {
    label: '修改密码',
    key: '1',
  },
  {
    label: '退出登录',
    key: '2',
  },
];

const App: React.FC = () => {

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [name, setName] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setName(getCookie('name') || '')
  }, [])

  const onClick = ({ key }) => {
    if (key === '1') {
      setModal(true)
    } else {
      clearAllCookie();
      location.href = '/login'
    }
  }

  const onFinish = async (value: { ped: string, pwd1: string, pwd2: string, uid?: string }) => {
    try {
      const { pwd, pwd1, pwd2 } = value
      if (pwd1 !== pwd2) {
        message.error('两次密码不一致!')
      }
      value.uid = getCookie('uid')

      const { code, msg } = await editUserPwd(value)

      if (code !== 200) return message.error(msg)

      message.success('修改成功，请重新登录！')

      setTimeout(() => {
        clearAllCookie();
        location.href = '/login'
      }, 1000)

    }
    catch (err) {
      console.log("修改失败", err);

      message.error('修改失败')
    }
    finally {
      setModal(false)
    }

  }

  return (
    <>
      <Layout className={styles.layout}>
        <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider}>
          <div className={styles.logo}>
            {/* <img src={logo} alt="logo" className={styles.logoImage} /> */}
            <div className={styles.logoImage}></div>
            {
              !collapsed && (<span className={styles.title}>工资管理系统</span>)
            }
          </div>
          <Menus />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: styles.trigger, onClick: () => setCollapsed(!collapsed) })}
            <div className={styles.info}>
              <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottom">
                <Space>
                  {name}
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </Header>

          <Content className={styles.content}>
            <div className={styles.container}><Outlet /></div>
          </Content>
        </Layout>
      </Layout>

      <Modal title="修改密码" open={modal} footer={null} onCancel={() => setModal(false)}>
        <br />
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="pwd" rules={[{ required: true, message: '请输入旧密码' }]}>
            <Input placeholder="旧密码" className='input' type="password" />
          </Form.Item>

          <Form.Item name="pwd1" rules={[{ required: true, message: '请输入新密码' }]}>
            <Input placeholder="密码" className='input' type="password" />
          </Form.Item>

          <Form.Item name="pwd2" rules={[{ required: true, message: '请再次确认密码' }]}>
            <Input type="password" placeholder="确认密码" className='input' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};

export default App;