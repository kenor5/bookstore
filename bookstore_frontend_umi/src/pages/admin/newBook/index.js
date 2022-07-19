import React from "react";
import "../../bookDetail/bookDetail.css"
import {Layout, Descriptions, Form, Input, Button} from "antd";
import {history} from 'umi';
import {deleteBook, getBook, newBook, updateBook} from "../../../service/bookService";
import AdminMenu from "../../../components/adminMenu";


const { Header, Content, Sider } = Layout;


export default class NewBook extends React.Component{
  onFinish = (values) => {
    console.log(values);
    const callback = (data) => {
      history.push('/admin')
    }
    newBook(values,callback);
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
              <h1 style={{fontSize:35, marginLeft:120}}>新建图书</h1>
              <Form
                name="wrap"
                labelCol={{
                  flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                  flex: 1,
                }}
                colon={false}
                onFinish={this.onFinish}
              >
                <Form.Item
                  label="封面地址"
                  name="image"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="书名"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="类型"
                  name="type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="作者"
                  name="author"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="价格"
                  name="price"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="isbn"
                  name="isbn"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="库存"
                  name="inventory"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="描述"
                  name="description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
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
