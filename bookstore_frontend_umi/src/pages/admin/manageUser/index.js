import React from "react";
import "../../bookDetail/bookDetail.css"
import {Layout, Descriptions, Form, Input, Button, Table} from "antd";
import {history} from 'umi';
import {getBook, updateBook} from "../../../service/bookService";
import AdminMenu from "../../../components/adminMenu";
import {getOrders} from "../../../service/orderService";
import {getUsers, updateUser} from "../../../service/userService";


const { Header, Content, Sider } = Layout;


const columns = [
  {
    title: 'ID',
    dataIndex: 'user_id',
    key: 'id',

  },
  {
    title: 'Forbidden',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },

];

export default class ManageUser extends React.Component{

  onFinish = (values) => {
    console.log(values);
    const callback = () => {
      this.init();
    }
    updateUser(values, callback);
  }

  constructor(props) {
    super(props);
    this.state = {
      source:[]
    };
  }

  init() {

    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }

    const callback = (data) => {
      this.setState({
        source: data
      });
    }

    getUsers(callback);
  }

  componentDidMount () {
    this.init();
  }

  render() {
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

              <Table  columns={columns} dataSource={this.state.source} />
              <span>*注：id为-1则插入用户，只输入id为删除用户，输入id和三个信息中的一个或多个为更新信息</span>
              <Form
                name="wrap"
                labelCol={{
                  flex: '110px',
                }}
                labelAlign="left"
                style={{marginTop:20}}
                labelWrap
                wrapperCol={{
                  flex: 1,
                }}
                colon={false}
                onFinish={this.onFinish}
              >
                <Form.Item
                  label="ID"
                  name="user_id"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      transform: (value) => {
                        return parseInt(value);
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Forbidden"
                  name="state"
                  rules={[
                    {
                      type: 'boolean',
                      transform: (value) => {
                        return Boolean(value);
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                >
                  <Input />
                </Form.Item>

                <Form.Item label=" ">
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>



            </Content>
          </Layout>
        </Content>

      </Layout>

    );
  }

}
