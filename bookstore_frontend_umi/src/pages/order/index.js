import React from "react";
import {Input, Layout, Popconfirm,DatePicker} from "antd";
import { Table, Tag, Space } from 'antd';
import MyMenu from "../../components/menu";
import {history} from "../../.umi/core/history";
import {getOrder, getOrders, getUserOrderByName, getUserOrderByRange, removeOrder} from "../../service/orderService";
import * as PropTypes from "prop-types";
import {getBooksByName} from "../../service/bookService";

const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Search } = Input;

Search.propTypes = {
  style: PropTypes.shape({margin: PropTypes.string}),
  placeholder: PropTypes.string,
  enterButton: PropTypes.bool
};
export default class Order extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      order:[]
    }
  }

  onSearch = value =>{
    const callback = (data) => {
      for (let i = 0; i < data.length; i++)
        Object.defineProperty(data[i], "key", {value:i+1});
      this.setState({order:data});
    }
    getUserOrderByName(JSON.parse(localStorage.getItem('user')).user_id,value,callback);
  }

  componentDidMount() {
    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }
    const callback = (data) => {
      for (let i = 0; i < data.length; i++)
        Object.defineProperty(data[i], "key", {value:i+1});
      this.setState({order:data});
    }
    getOrder(JSON.parse(localStorage.getItem('user')).user_id, callback);
  }

  render() {

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
        this.setState({order:data});
      }
      getOrder(JSON.parse(localStorage.getItem('user')).user_id, callback1);
    }

    const columns = [

      {
        title: '订单编号',
        dataIndex: 'order_id',
        key: 'order_id',
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

    const onChange = (dates, dateStrings) => {
      if (dates) {
        const callback = (data) => {
          for (let i = 0; i < data.length; i++)
            Object.defineProperty(data[i], "key", {value: i + 1});
          this.setState({order: data});
        }
        getUserOrderByRange(JSON.parse(localStorage.getItem('user')).user_id, dateStrings, callback);
      }
    };



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
              height:"90vh"
            }}
          >
            <Sider className="site-layout-background" theme={'light'} width={200}>

              <MyMenu/>
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
                dataSource={this.state.order}
              />

            </Content>
          </Layout>
        </Content>

      </Layout>

    );
  }

}
