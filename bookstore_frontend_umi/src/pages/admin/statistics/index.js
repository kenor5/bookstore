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
import {MailOutlined,AppstoreOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Header, Content, Sider } = Layout;

export default class Statistics extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      page:0,
      source:[],
      date:['2022-01-01','2022-12-22'],
      consume:[]
    };
  }

  callback = (data) => {
    let rt = [];
    // console.log(data);
    for (let i = 0 ; i < data.length; i++) {
      let orderItems = data[i].orderItems;

      for (let j = 0; j < orderItems.length; j++) {
        let orderItem = orderItems[j];
        // console.log(orderItem);
        let flag = 0;
        for (let k = 0; k < rt.length; k++) {
          if (rt[k].book_id === orderItem.book.book_id)
          {
            rt[k].book_num += orderItem.book_num;
            flag = 1;
            break;
          }
        }
        if (flag === 0) {

          rt.push({
            book_id:orderItem.book.book_id,
            name:orderItem.book.name,
            book_num:orderItem.book_num
          });
        }
      }
    }

    rt.sort((a, b)=> {
      return b.book_num - a.book_num;
    })
    // console.log(rt);
    for (let i = 0; i < rt.length; i++)
      Object.defineProperty(rt[i], "key", {value:i+1});
    this.setState({
      source: rt
    });
    // console.log(data);
  }

  callback1 = (data) => {
    let rt = [];
    for (let i = 0 ; i < data.length; i++) {
        let flag = 0;
        for (let k = 0; k < rt.length; k++) {
          if (rt[k].user_id === data[i].user_id)
          {
            rt[k].tot_price += data[i].tot_price;
            flag = 1;
            break;
          }
        }
        if (flag === 0) {

          rt.push({
            user_id:data[i].user_id,
            tot_price: data[i].tot_price
          });
        }

    }

    rt.sort((a, b)=> {
      return b.tot_price - a.tot_price;
    })
    console.log(rt);
    for (let i = 0; i < rt.length; i++)
      Object.defineProperty(rt[i], "key", {value:i+1});
    this.setState({
      consume: rt
    });
    // console.log(data);
  }

  componentDidMount () {
    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }
    getAdminOrderByRange(this.state.date, this.callback);
  }



  render() {

    const onChange = (dates, dateStrings) => {
      if (dates) {
        const callback = (data) => {
          this.callback(data);
          this.setState({
            date:dateStrings
          });
        }
        getAdminOrderByRange(dateStrings, callback);
      }
    };

    const onChange1 = (dates, dateStrings) => {
      if (dates) {
        const callback = (data) => {
          this.callback1(data);
          this.setState({
            date:dateStrings
          });
        }
        getAdminOrderByRange(dateStrings, callback);
      }
    };




    const columns = [
      {title:'排名',
        dataIndex: 'key',
        key: 'key',

      },

      {
        title: '书id',
        dataIndex: 'book_id',
        key: 'book_id',
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '售出数量',
        dataIndex: 'book_num',
        key: 'book_num',
      },


    ];

    const columns1 = [
      {title:'排名',
        dataIndex: 'key',
        key: 'key',
      },

      {
        title: '用户id',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '消费总额',
        dataIndex: 'tot_price',
        key: 'tot_price',
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
              <Menu mode="horizontal"
                    onClick={(e)=>{if (e.key === 'first') {
                      this.setState({page: 0});
                    }else {
                      this.setState({page: 1});
                      if (this.state.consume.length === 0)
                        getAdminOrderByRange(this.state.date, this.callback1);
                    }
                    }}
                    defaultSelectedKeys={['first']} >
                <Menu.Item key="first" icon={<MailOutlined />}>
                  书籍销售排行
                </Menu.Item>
                <Menu.Item key="second" icon={<AppstoreOutlined />}>
                  用户消费排行
                </Menu.Item>
              </Menu>
              {this.state.page === 0?<div>
                <RangePicker
                  onChange={onChange}
                  style={{
                    margin: '10px 0',
                    width: '40%'
                  }}/>
                <h1 style={{fontSize: 30}}>{this.state.date[0]}至{this.state.date[1]}销量排行榜</h1>

                <Table
                  className="components-table-demo-nested"
                  columns={columns}
                  dataSource={this.state.source}
                />
              </div>:
                <div>
                  <RangePicker
                    onChange={onChange1}
                    style={{
                      margin: '10px 0',
                      width: '40%'
                    }}/>
                  <h1 style={{fontSize: 30}}>{this.state.date[0]}至{this.state.date[1]}用户消费排行榜</h1>
                  <Table
                    className="components-table-demo-nested"
                    columns={columns1}
                    dataSource={this.state.consume}
                  />

                </div>
              }

            </Content>
          </Layout>
        </Content>

      </Layout>

    );
  }

}
