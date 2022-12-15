import React, { useState, useEffect } from 'react'
import { Space, Button, Input, Form, DatePicker, Select, message } from 'antd'
import styles from './addModal.module.scss'

import { addEmployeesInfo, editEmployeesInfo } from "@/api/employees"


function AddModal(props) {

  const { columns, defaultColumns, isEdit, addInfo, editInfo } = props

  const [form] = Form.useForm()

  // 添加员工
  const onFinish = (value: Employees) => {
    isEdit ? edit(value) : add(value)
  }

  // 添加
  const add = async (value: Employees) => {
    try {

      await addInfo(value)

      // 添加成功更新列表
      // changeColumns()

      // 清空表单
      form.resetFields()

    }
    catch (err) {
      console.log("err", err)
      message.error(err)
    }
  }

  // 修改
  const edit = async (value: Employees) => {
    try {

      await editInfo(value)

      // changeColumns()

      form.resetFields()

      // close()

    }
    catch (err) {
      console.log("err", err)
      message.error(err)
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 3 }}
      initialValues={defaultColumns}
      onFinish={onFinish}
      autoComplete="off"
      labelWrap={true}
      className={styles.from}
      form={form}
    >
      {
        columns.map((v, i) => (
          // 不能等于操作
          (i !== columns.length - 1) && ((v.type && v.type !== "none")) &&
          (
            <Form.Item
              label={v.title.length === 2 ? '员工' + v.title : v.title}
              name={v.dataIndex}
              rules={[{ required: v.required, message: `请输入${v.title}` }]}
              className={styles.formItem}
              key={i}
            >
              {
                (v.type && v.type === 'DatePicker'
                  ? <DatePicker
                    placeholder={`请选择${v.title}`}
                    style={{ width: '100%' }}
                    format={'YYYY-MM-DD'}
                  />
                  : v.type && v.type === 'Select'
                    ? <Select placeholder={`请选择${v.title}`} allowClear options={v.options} />
                    : v.type && v.type === 'money'
                      ? <Input prefix="￥" suffix="RMB" />
                      : <Input placeholder={`请输入${v.title}`} type={v.type} />)
              }

            </Form.Item>
          )

        ))
      }
      <Form.Item className={styles.submit}>
        <Button type="primary" htmlType="submit">
          {isEdit ? '保存修改' : '添加员工'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddModal;