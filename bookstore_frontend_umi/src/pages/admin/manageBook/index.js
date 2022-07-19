import React from "react";
import "../../bookDetail/bookDetail.css"
import {Layout, Descriptions, Form, Input, Button} from "antd";
import {history} from 'umi';
import {deleteBook, getBook, updateBook} from "../../../service/bookService";
import AdminMenu from "../../../components/adminMenu";


const { Header, Content, Sider } = Layout;


export default class ManageBook extends React.Component{
  onFinish = (values) => {
    console.log(values);
    const callback = (data) => {
      this.setState({
        source: data
      });
    }
    updateBook(values,this.state.source.book_id, callback);
  }
  onDelete = () => {
    const callback = () => {
      history.push('/admin');
    }
    deleteBook(this.state.source.book_id, callback);
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
    console.log(history.location.state)
    const callback = (data) => {
      this.setState({
        source: data
      });
    }
    // console.log(history.location.state);
    if (history.location.state === undefined)
      history.push('/admin');
    else
      getBook(history.location.state.src ,callback);

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

                <img src={this.state.source.image} alt="" style={{width:300,position:"absolute"}}/>
                <Descriptions title="图书信息" column={1} style={{width:400,position:"absolute",marginLeft:340}}>
                  <Descriptions.Item label="书名">{this.state.source.name}</Descriptions.Item>
                  <Descriptions.Item label="类型">{this.state.source.type}</Descriptions.Item>
                  <Descriptions.Item label="作者">{this.state.source.author}</Descriptions.Item>
                  <Descriptions.Item label="售价">{this.state.source.price_after}</Descriptions.Item>
                  <Descriptions.Item label="描述">{this.state.source.description}</Descriptions.Item>
                </Descriptions>

              <Form
                name="wrap"
                labelCol={{
                  flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                style={{marginTop:'45%'}}
                wrapperCol={{
                  flex: 1,
                }}
                colon={false}
                onFinish={this.onFinish}
              >
                <Form.Item
                  label="封面地址"
                  name="image"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="书名"
                  name="name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="类型"
                  name="type"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="作者"
                  name="author"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="价格"
                  name="price"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="描述"
                  name="description"
                >
                  <Input />
                </Form.Item>

                <Form.Item label=" ">
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button type="primary" danger
                          onClick={this.onDelete}
                          style={{marginLeft:'50%'}}>
                    删除图书
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
