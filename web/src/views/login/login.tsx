import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { getLogin } from "@/api/user.ts";
import { setCookie } from "@/utils/auth.ts"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

function login(): React.FC {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false)

  // const { name } = useSelector((state: Rootstate) => ({
  //   name: state.user.name
  // }))

  const toLogin = async (values: any) => {

    try {
      setLoading(true)

      const { code, data, msg }: LoginInterface = await getLogin({ uname: values.username, upwd: values.password });

      if (code !== 200) return message.error(msg)

      setCookie('TOKEN', data.token)
      setCookie('uid', data.creator?.uid)
      setCookie('name', data.creator?.name)
      setCookie('b', data.creator?.b || 0)
      setCookie('d', data.creator?.d || 0)
      setCookie('w', data.creator?.w || 0)
      setCookie('r', data.creator?.r || 0)

      dispatch({ type: "add", val: data.creator })

      message.success("登录成功")

      navigate('/')
    }
    catch (err) {
      console.log("登录错误", err);

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginFrom}>
        <h2 className={styles.h2}>工资发放系统</h2>
        <Form initialValues={{ remember: true }} onFinish={toLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined
                className={styles.itemIcon} />}
              placeholder="用户名"
              size="large"
              className='input'
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className={styles.itemIcon} />}
              type="password"
              placeholder="密码"
              size="large"
              className='input'
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.formBtn} size="large" loading={loading}>
              登录
            </Button>
          </Form.Item>



        </Form>
      </div>
    </div>
  );
}

export default login;