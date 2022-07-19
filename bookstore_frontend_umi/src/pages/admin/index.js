import {Layout, Carousel, Input, Button} from 'antd';
import React from "react";
import SingleBook from "../../components/singleBook";
import MyMenu from "../../components/menu"
import {history} from 'umi';
import {getBooks, getBooksByName} from '../../service/bookService'
import AdminMenu from "../../components/adminMenu";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



export default class Admin extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      bookList:[]
    }
  }

  onSearch = value =>{
    const callback= (data) => {
      this.setState({bookList: data});
    }
    getBooksByName(value,callback);
  }

  componentDidMount() {

    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }
    const callback =  (data) => {
      // console.log(data);
      this.setState({
        bookList:data
      });
    };

    getBooks(callback);
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
            height:"100%"
          }}
        >

          <Layout
            className="site-layout-background"
            style={{
              padding: '24px 0',
            }}
          >
            <Sider className="site-layout-background" theme={'light'} width={200}>
              <AdminMenu   />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
              }}
            >
              <Search
                placeholder="input search text"
                onSearch={this.onSearch}
                enterButton
                style={{
                  margin:'10px 0'
                }}
              />

              <div className="product">
                <ul>
                  {this.state.bookList.map(
                    (item) =>{return <SingleBook src={item}/>})
                  }
                </ul>

              </div>
              <Button type="primary"
                      onClick={()=>history.push('/admin/newBook')}
                      style={{width:'50%', marginLeft:'25%',marginTop:30,}}>
                添加图书
              </Button>

            </Content>
          </Layout>
        </Content>

      </Layout>
    );

  }
}
