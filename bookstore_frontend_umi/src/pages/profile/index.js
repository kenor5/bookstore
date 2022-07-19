import React from "react";
import {Layout, Descriptions, Button} from "antd";
import { Table, Tag, Space } from 'antd';
import MyMenu from "../../components/menu";
import { PoweroffOutlined } from '@ant-design/icons';
import {logout} from "../../service/userService";
import {history} from "../../.umi/core/history";

const { Header, Content, Sider } = Layout;


export default class Profile extends React.Component{

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }
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
              <Descriptions title="User Info">
                <Descriptions.Item label="UserName">{JSON.parse(localStorage.getItem('user')).nickname}</Descriptions.Item>
                <Descriptions.Item label="Telephone">{JSON.parse(localStorage.getItem('user')).tel}</Descriptions.Item>
                <Descriptions.Item label="Live">{JSON.parse(localStorage.getItem('user')).address}</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                  {JSON.parse(localStorage.getItem('user')).address}
                </Descriptions.Item>

              </Descriptions>
              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={() => logout()}
                danger
              >
                Log out
              </Button>
            </Content>
          </Layout>
        </Content>

      </Layout>

    );
  }

}
