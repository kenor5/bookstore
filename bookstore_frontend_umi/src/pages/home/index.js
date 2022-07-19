import { Layout, Carousel, Input} from 'antd';
import React from "react";
import SingleBook from "../../components/singleBook";
import MyMenu from "../../components/menu"
import data from "../../asset/bookSrc.json"
import {history} from 'umi';
import {getBooks, getBooksByName} from '../../service/bookService'
import carousel1 from '../../asset/img/carousel1.jpg'

import carousel2 from '../../asset/img/carousel2.jpg'
import carousel3 from '../../asset/img/carousel3.jpg'
import carousel4 from '../../asset/img/carousel4.jpeg'
import {parse} from "qs";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

const contentStyle = {
  width:'100%',

  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};




export default class Home extends React.Component{

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

    if (localStorage.getItem('user') == null ||
      JSON.parse(localStorage.getItem('user')).user_type === 0
    ) {
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
          <h1 style={{marginLeft:'10%',color:'white',fontSize:30}}>WELCOME TO MY BOOKSTORE!</h1>
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
              <MyMenu   />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
              }}
            >
              <Carousel autoplay>
                <div>
                  <img src={carousel1} style={contentStyle} />

                </div>
                <div>
                  <img src={carousel2} style={contentStyle} />

                </div>
                <div>
                  <img src={carousel3} style={contentStyle} />

                </div>
                <div>
                  <img src={carousel4} style={contentStyle} />

                </div>
              </Carousel>

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

            </Content>
          </Layout>
        </Content>

      </Layout>
    );

  }
}
