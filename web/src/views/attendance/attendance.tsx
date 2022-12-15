import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Button, Input, Tooltip, Modal, Form, DatePicker, Select, message } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';

import TableSearch from '@/hooks/TableSearch'
import useWindowSize from '@/hooks/useWindowSize'

import { getAttendanceInfo, editAttendanceInfo } from "@/api/attendance"

import AddModal from "@/component/addModal/addModal"

const { Search } = Input;

interface DataType {
  title: string | number,
  dataIndex: string,
  align: string,
  fixed: string,
  width: number | string,
}

// const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };


function attendance(): React.FC {

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
  // 显示表单
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // 点击修改时默认赋值
  const [defaultColumns, setDefaultColumns] = useState({})
  // 是否是编辑
  const [isEdit, setEdit] = useState<boolean>(false)

  // 表头搜索功能
  const getColumnSearch = TableSearch()
  // 监听页面变化
  const size = useWindowSize()

  // 表头
  const columns: ColumnsType<any> = [
    {
      title: '工号',
      dataIndex: 'uid',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: "none",

      ...getColumnSearch('uid', '工号'),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 120,
      required: true,
      type: "none",
      ...getColumnSearch('name', '姓名'),
    },
    {
      title: '出勤天数',
      dataIndex: 'work_day',
      align: 'center',
      width: 120,
      required: true,
      type: "number",
      ...getColumnSearch('work_day', '出勤天数'),
    },
    {
      title: '实际天数',
      dataIndex: 'total_day',
      align: 'center',
      width: 120,
      required: true,
      type: "number",
      ...getColumnSearch('total_day', '实际天数'),
    },
    {
      title: '加班天数',
      dataIndex: 'over_day',
      align: 'center',
      width: 120,
      required: true,
      type: "number",
      ...getColumnSearch('over_day', '加班天数'),
    },
    {
      title: '计件数',
      dataIndex: 'piece_total',
      align: 'center',
      width: 120,
      required: true,
      type: "number",
      ...getColumnSearch('piece_total', '计件数'),
    },
    {
      title: '绩效得分',
      dataIndex: 'score',
      align: 'center',
      width: 120,
      required: true,
      type: "number",
      ...getColumnSearch('score', '绩效得分'),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (text, record, index) => (
        <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => goEdit(text, index)}>修改</Button>
      ),
      onCell: (record) => {
        return {
          colSpan: 1
        }
      },
    },
  ];


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
    // setIndex(index)
    setIsModalOpen(true)
  }

  // 获取考勤信息
  const getList = async (page: number = 1, limit: number = 10) => {
    try {
      const res = await getAttendanceInfo({ page, limit })

      if (res.code !== 200) {
        return
      }

      const List = res.data.data.map((v, i) => ({
        key: i + 1,
        ...v,
      }))

      setData(List)
      setTotal(res.data?.total)
      res.data?.total >= limit && setPagination(true)

    }
    catch {
      console.log("获取失败");
      setData([])
    }
    finally {
      setLoading(false)
    }
  }

  // 修改考勤记录
  const editInfo = async (value: Datum) => {
    try {

      value.uid = defaultColumns.uid

      delete value.name

      const { code, msg } = await editAttendanceInfo(value)

      if (code !== 200) return message.error(msg)

      message.success("修改成功")

      getList(page, limit)
      setIsModalOpen(false)
    }
    catch {
      message.error("修改错误")
    }
  }


  useEffect(() => {
    getList(page, limit)
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
          // changeColumns={() => getList(page, limit)}
          addInfo={(value: Datum) => null}
          editInfo={(value: Datum) => editInfo(value)}
        />
      </div >
    )
  } else {
    return (
      <div className='box'>
        {/* <div className='btns'>
          <Space size={10}>
            <Button type="primary" icon={<UserAddOutlined />} onClick={showMoal}>添加员工</Button>
            <Button type="primary" icon={<DeleteOutlined />} danger disabled={delSelect} onClick={delCheck}>删除选中</Button>
          </Space>
        </div> */}
        <Table
          // rowSelection={{ type: 'checkbox', ...rowSelection, }}
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
          scroll={{ x: '100%', y: size.height - 280 }}
        />
      </div >
    );
  }
}

export default attendance;