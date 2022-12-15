import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Button, Input, Tooltip, Modal, Form, DatePicker, Select, message } from 'antd';
import {
  UserAddOutlined,
  ImportOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  LeftOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import TableSearch from '@/hooks/TableSearch'
import useWindowSize from '@/hooks/useWindowSize'

// import { getEmployeesList, delEmployeesInfo, addEmployeesInfo, editEmployeesInfo } from "@/api/employees"
// import { getDepartmentInfo } from "@/api/department"

import { getUserInfo, addUserInfo, delUserInfo,editUserInfo } from "@/api/user"

import AddModal from "@/component/addModal/addModal"


const { Search } = Input;

interface DataType {
  title: string | number,
  dataIndex: string,
  align: string,
  fixed: string,
  width: number | string,
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


function employees(): React.FC {

  // 表格加载
  const [loading, setLoading] = useState<boolean>(true)
  // 表格数据
  const [data, setData] = useState<Array<any>>([])
  // 表格数据总条数
  const [total, setTotal] = useState<number>(0)
  // 页码
  const [page, setPage] = useState<number>(1)
  // 每次请求的数据
  const [limit, setLimit] = useState<number>(15)
  // 是否显示分页器
  const [pagination, setPagination] = useState<boolean>(false)
  // 选择框选中则删除选中按钮生效
  const [delSelect, setDelSelect] = useState<boolean>(true)
  // 需要删除的列表
  const [delList, setDelList] = useState<Array<any>>([])
  // 添加员工
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // 岗位
  const [dep, setDep] = useState([])
  // 点击修改时默认赋值
  const [defaultColumns, setDefaultColumns] = useState({})
  // 需要修改或删除的索引
  const [index, setIndex] = useState<number>(0)
  // 是否是编辑
  const [isEdit, setEdit] = useState<boolean>(false)

  // 表头搜索功能
  const getColumnSearch = TableSearch()
  // 监听页面变化
  const size = useWindowSize()

  // 表头
  const columns: ColumnsType<any> = [
    {
      title: '用户名',
      dataIndex: 'name',
      align: 'center',
      width: 120,
      required: true,
      type: "text",
      ...getColumnSearch('name', '用户名'),
    },
    {
      title: '添加权限',
      dataIndex: 'b',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: 'Select',
      options: [{ value: 1, label: '1' }, { value: 0, label: '0' }],
      ...getColumnSearch('b', '增'),
    },
    {
      title: '删除权限',
      dataIndex: 'd',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: 'Select',
      options: [{ value: 1, label: '1' }, { value: 0, label: '0' }],
      ...getColumnSearch('d', '删'),
    },
    {
      title: '修改权限',
      dataIndex: 'w',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: 'Select',
      options: [{ value: 1, label: '1' }, { value: 0, label: '0' }],
      ...getColumnSearch('w', '改'),
    },
    {
      title: '查看权限',
      dataIndex: 'r',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: 'Select',
      options: [{ value: 1, label: '1' }, { value: 0, label: '0' }],
      ...getColumnSearch('r', '查'),
    },
    {
      title: '密码',
      dataIndex: 'pwd',
      align: 'center',
      width: 150,
      ellipsis: true,
      required: true,
      type: 'password',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 180,
      render: (text, record, index) => (
        <>
          <Space size="middle">
            <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => goEdit(text, index)}>修改</Button>
            <Button size="small" type="primary" danger icon={<DeleteOutlined />} onClick={() => goDel(text)}>删除</Button>
          </Space>
        </>
      ),
      onCell: (record) => {
        return {
          colSpan: 1
        }
      },
    },
  ];

  // 选中选择框
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setDelList(selectedRows)
      selectedRows.length === 0 ? setDelSelect(true) : setDelSelect(false)
    },
  };


  // 获取员工列表
  const getList = async (page: number = 1, limit: number = 10) => {
    try {
      const res = await getUserInfo({ page, limit })

      if (res.code !== 200) return setData([])

      const List = res.data.data.map((v, i) => ({
        key: i + 1,
        ...v,
      }))



      setData(List)
      setTotal(res.data.total)
      res.data.total >= limit && setPagination(true)
    }
    catch (err) {
      console.log("获取失败", err);
    }
    finally {
      setLoading(false)
    }
  }

  // 显示添加员工
  const showMoal = () => {
    // 清空
    getDefaultColumns()
    setEdit(false)
    setIsModalOpen(true)
  }

  // 点击修改
  const goEdit = (text: any, index: number) => {
    setEdit(true)
    setDefaultColumns(text)
    setIndex(index)
    setIsModalOpen(true)
  }

  // 删除
  const goDel = async (text: any, ischeckAll: boolean = false) => {

    try {
      const { code, msg } = await delUserInfo({ uid: text.id })

      if (code !== 200) return message.error(msg)

      !ischeckAll && message.success("删除成功")

      !ischeckAll && setData(data.filter(v => v.id !== text.id))
    }
    catch {
      message.error("删除失败")
    }
  }

  // 删除选中
  const delCheck = () => {
    try {
      let arr = data;
      delList.map(v => {
        goDel(v, true)
        arr = arr.filter(item => item.id !== v.id)
      })
      message.success("删除成功")
      setData(arr)
    }
    catch (err) {
      console.log("删除失败", err);

      message.error("删除失败")
    }
  }

  // 点击修改时赋初值
  const getDefaultColumns = () => {
    let obj: any = {}
    columns.map(v => v?.dataIndex && (obj[v.dataIndex] = null))
    setDefaultColumns(obj)
  }

  // 添加员工
  const addInfo = async (value: Employees) => {
    const { code, msg } = await addUserInfo(value)
    if (code !== 200) return message.error(msg)
    message.success("添加成功")
    getList(page, limit)
  }

  // 修改员工信息
  const editInfo = async (value: Employees) => {
    
    value.id = defaultColumns.id;

    const { code, msg } = await editUserInfo(value)

    if (code !== 200) return message.error(msg)

    message.success("修改成功")

    getList(page, limit)
    setIsModalOpen(false)

  }


  useEffect(() => {
    getList(page, limit)
    getDefaultColumns()
  }, [])


  if (isModalOpen) {
    return (
      <div className='box'>
        <div className='btns'>
          <Space size={10}>
            <Button type="link" block icon={<LeftOutlined />} onClick={() => setIsModalOpen(false)}>返回</Button>
          </Space>
        </div>
        <AddModal
          columns={columns}
          defaultColumns={defaultColumns}
          isEdit={isEdit}
          // 添加用户
          addInfo={(value: Employees) => addInfo(value)}
          editInfo={(value: Employees) => editInfo(value)}
        />
      </div >
    )
  } else {
    return (
      <div className='box'>
        <div className='btns'>
          <Space size={10}>
            <Button type="primary" icon={<UserAddOutlined />} onClick={showMoal}>添加用户</Button>
            <Button type="primary" icon={<DeleteOutlined />} danger disabled={delSelect} onClick={delCheck}>删除选中</Button>
          </Space>
        </div>
        <Table
          rowSelection={{ type: 'checkbox', ...rowSelection, }}
          columns={columns}
          dataSource={data}
          // onChange={onChange}
          // 边框
          bordered={true}
          // 加载
          loading={loading}
          // 分页器
          pagination={pagination}
          // 表格是否可以滚动
          scroll={{ x: '100%', y: size.height - 350 }}
        />
      </div >
    );
  }
}

export default employees;