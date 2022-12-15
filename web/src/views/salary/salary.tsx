import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Button, Input, Tooltip, Modal, Form, DatePicker, Select, message } from 'antd';
// import styles from './employees.module.scss'
import {
  UserAddOutlined,
  ImportOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  LeftOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';

import TableSearch from '@/hooks/TableSearch'
import useWindowSize from '@/hooks/useWindowSize'

import { getSalaryInfo } from "@/api/salary"

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

function salary(): React.FC {

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

  // 表头搜索功能
  const getColumnSearch = TableSearch()
  // 监听页面变化
  const size = useWindowSize()

  // 表头
  const columns: ColumnsType<any> = [
    {
      title: '员工工号',
      dataIndex: 'uid',
      align: 'center',
      width: 120,
      required: true,
      type: "text",
      ...getColumnSearch('uid', '员工工号'),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 120,
      required: true,
      type: "text",
      ...getColumnSearch('name', '姓名'),
    },
    {
      title: '基本工资',
      dataIndex: 'baseMoney',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: 'text',
      ...getColumnSearch('baseMoney', '基本工资'),
    },
    {
      title: '岗位工资',
      dataIndex: 'jobMoney',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: "none",
      showSorterTooltip: false,
      ...getColumnSearch('jobMoney', '岗位工资'),
    },
    {
      title: '绩效工资',
      dataIndex: 'performMoney',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: "none",
      showSorterTooltip: false,
      ...getColumnSearch('performMoney', '绩效工资'),
    },
    {
      title: '生活补贴',
      dataIndex: 'liveMoney',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: "none",
      showSorterTooltip: false,
      ...getColumnSearch('liveMoney', '生活补贴'),
    },
    {
      title: '加班工资',
      dataIndex: 'overMoney',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: "none",
      showSorterTooltip: false,
      ...getColumnSearch('overMoney', '加班工资'),
    },
    {
      title: '实发工资',
      dataIndex: 'totalMoney',
      align: 'center',
      width: 120,
      ellipsis: true,
      required: true,
      type: "none",
      showSorterTooltip: false,
      ...getColumnSearch('totalMoney', '实发工资'),
    }
  ];


  // 获取员工列表
  const getList = async (page: number = 1, limit: number = 10) => {
    try {
      const res = await getSalaryInfo({ page, limit })

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


  useEffect(() => {
    getList(page, limit)
  }, [])

  return (
    <div className='box'>
      <Table
        columns={columns}
        dataSource={data}
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

export default salary;