import React from "react";
import "./bookDetail.css"
import { Layout} from "antd";
import MyMenu from "../../components/menu";
import {history} from 'umi';
import {getBook} from "../../service/bookService";
import {addToCart} from "../../service/cartService";


const { Header, Content, Sider } = Layout;


export default class BookDetail extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      source:[]
    };
  }

  componentDidMount() {

      if (localStorage.getItem('user') == null) {
        history.push('/login');
      }
    console.log(history.location.state)
    const callback = (data) => {
      this.setState({
        source: data
      });
    }
      console.log(history.location.state);
      if (history.location.state === undefined)
        history.push('/');
      else
        getBook(history.location.state.src ,callback);

  }

  onAddCartClick = () => {
    let data= {
      user_id:JSON.parse(localStorage.getItem('user')).user_id,
      book_id: this.state.source.book_id
    }
    console.log(data);
    addToCart(data);
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

            <MyMenu/>
          </Sider>

          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <div className="layout-bookdetail">
              <div className="book-content">
                <div className="cover">
                  <img src={this.state.source.image}  alt={""}/>
                </div>
                <div className="message-wrap">
                  <div className="message">
                    <span className="book-name">{this.state.source.name}</span>
                  </div>
                  <div className="message">
                    <span className="text">作者：</span>
                    <span className="auther">{this.state.source.author}</span>
                  </div>
                  <div className="message">
                    <span className="text">分类：</span>
                    <span className="classification">{this.state.source.type}</span>
                  </div>
                  <div className="message">
                    <span className="text">售价：</span>
                    <span className="price">{this.state.source.price_after}</span>
                  </div>
                  <div className="message">
                    <span className="text">状态：</span>
                    <span className="state">有货</span>
                    <span className="text-little">库存：</span>
                    <span className="rest">{this.state.source.inventory}</span>
                    <span className="text-little">本</span>
                  </div>
                  <div className="message">
                    <span className="text">作品简介：</span>
                    <span
                      className="intro">{this.state.source.description}</span>
                  </div>
                </div>
              </div>
              <div className="buy-button">
                <button className="buy"
                        onClick={()=>this.onAddCartClick()}>加入购物车</button>
                <button className="buy-immi">立即购买</button>
              </div>
            </div>

          </Content>
        </Layout>
      </Content>

    </Layout>

    );
  }

}
