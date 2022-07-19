import React from "react";
import "../../bookDetail/bookDetail.css"
import {Layout, Badge, Dropdown, Menu, Space, Table, Popconfirm, DatePicker, Input} from "antd";
import {history} from 'umi';

import AdminMenu from "../../../components/adminMenu";
import {
  getAdminOrderByName,
  getAdminOrderByRange,
  getOrder,
  getOrders, getUserOrderByName,
  getUserOrderByRange,
  removeOrder
} from "../../../service/orderService";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Header, Content, Sider } = Layout;

export default class ManageOrder extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      source:[]
    };
  }

  onSearch = value =>{
    const callback = (data) => {
      for (let i = 0; i < data.length; i++)
        Object.defineProperty(data[i], "key", {value:i+1});
      this.setState({source:data});
    }
    getAdminOrderByName(value,callback);
  }

  init() {

    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }
    // console.log(history.location.state)
    const callback = (data) => {
      for (let i = 0; i < data.length; i++)
        Object.defineProperty(data[i], "key", {value:i+1});
      this.setState({
        source: data
      });
      // console.log(data);
    }

    getOrders(callback);
  }

  componentDidMount () {
    this.init();
  }



  render() {

    const onChange = (dates, dateStrings) => {
      if (dates) {
        const callback = (data) => {
          for (let i = 0; i < data.length; i++)
            Object.defineProperty(data[i], "key", {value: i + 1});
          this.setState({source: data});
        }
        getAdminOrderByRange(dateStrings, callback);
      }
    };

    const expandedRowRender = (record) => {
      console.log(record);
      const columns = [
        {
          title: '书名',
          dataIndex: ['book','name'],
          key: 'name',
        },
        {
          title: '数量',
          dataIndex: 'book_num',
          key: 'book_num',
        },

      ];


      return <Table columns={columns} dataSource={record.orderItems} pagination={false}/>;

    };

    const callback = () => {
      const callback1 = (data) => {
        for (let i = 0; i < data.length; i++)
          Object.defineProperty(data[i], "key", {value:i+1});
        this.setState({source:data});
      }
      getOrders( callback1);
    }
    const columns = [

      {
        title: '订单编号',
        dataIndex: 'order_id',
        key: 'order_id',
      },
      {
        title: '用户id',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '订单时间',
        dataIndex: 'order_time',
        key: 'order_time',
      },
      {
        title: '操作',
        key: 'operation',
        render: (_, record) => <Popconfirm title="Sure to delete?" onConfirm={()=>removeOrder(record.order_id, callback)}>
          <a >Delete</a>
        </Popconfirm>
      },

    ];

    return(
      <Layout>
        <Header className="header">
          <div className="logo" />
          {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}
        </Header>
        <Content
          style={{
            padding: '0 50px',
            width: '1200px',
            alignSelf:"center",
            height:"93vh"
          }}
        >

          <Layout
            className="site-layout-background"
            style={{
              padding: '24px 0',
            }}
          >
            <Sider className="site-layout-background" theme={'light'} width={200}>

              <AdminMenu/>
            </Sider>

            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
              }}
            >

              <RangePicker
                onChange={onChange}
                style={{
                  margin:'10px 0',
                  width:'40%'
                }}/>
              <Search
                placeholder="输入订单中的书名"
                onSearch={this.onSearch}
                enterButton
                style={{
                  margin:'10px 40px',
                  width:'40%'
                }}
              />
              <Table
                className="components-table-demo-nested"
                columns={columns}
                expandable={{
                  expandedRowRender,
                }}
                dataSource={this.state.source}
              />



            </Content>
          </Layout>
        </Content>

      </Layout>

    );
  }

}
