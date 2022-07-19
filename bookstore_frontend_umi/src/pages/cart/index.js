import React, {useState} from "react";
import {Button, Layout, Popconfirm } from "antd";
import { Table, Tag, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import MyMenu from "../../components/menu";
import {history} from "../../.umi/core/history";
import {deleteCart, getCart} from "../../service/cartService";
import {getBook, getBookByIds} from "../../service/bookService";
import {addToOrder} from "../../service/orderService";

const { Header, Content, Sider } = Layout;


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a onClick={()=>{
      history.push({
        pathname: '/bookDetail',
        state: {
          src: record.book_id
        }
      });
    }
    }>{text}</a>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Price',
    dataIndex: 'price_after',
    key: 'price_after',
  },
  {
    title: 'Num',
    dataIndex: 'book_num',
    key: 'book_num',
  }

];


function RangePicker() {
  return null;
}

export default class Cart extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      bookList:[],
      selectedRowKeys: [],
      cartData:[]
    }
  }

  init = () => {
    const callback1= (data) => {    // set 'key' and 'book_num' which are presented on front_end
      for (let i =0; i < data.length; i++) {
        Object.defineProperty(data[i], "key", {value:i+1});
        for (let j = 0; j < this.state.cartData.length; ++j) {
          if (data[i].book_id === this.state.cartData[j].book.book_id) {
            Object.defineProperty(data[i], "book_num", {value:this.state.cartData[j].book_num});
            Object.defineProperty(data[i], "cart_item_id", {value:this.state.cartData[j].cart_item_id});
            break;
          }
        }
      }

      this.setState({
        bookList:data,
        selectedRowKeys: [],
        selections:[]
      });
    }

    const callback = (data)=> {
      if (data.length === 0) return;
      let l = [];
      for (let i =0; i < data.length; i++) {
        l.push(data[i].book.book_id);
      }
      getBookByIds(l, callback1);
      this.setState({
        cartData:data
      });
    }

    getCart(JSON.parse(localStorage.getItem('user')).user_id, callback);
  }

  componentDidMount() {
    if (localStorage.getItem('user') == null) {
      history.push('/login');
    }
    this.init();
  }

  onSelectChange = (selectedRowKeys,selections) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    // console.log(selections);
    let tmp = []
    for (let i = 0; i < selections.length; ++i) {
      // console.log(i)
      tmp.push({
        book_id: selections[i].book_id,
        book_num: selections[i].book_num,
      })
    }
    console.log(tmp);
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selections: tmp
    });
    // console.log(this.state.selectedRowKeys)
  };

  confirm = () => {
    let data=[];
    for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
      for (let j = 0; j < this.state.bookList.length; j++) {
        if (this.state.selectedRowKeys[i] === this.state.bookList[j].key) {
          data.push(this.state.bookList[j].cart_item_id);
        }
      }
    }
    const callback = () => {this.init();}
    deleteCart(data, callback);

  }


  render() {
    const {selections, selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length>0;
    let totPrice = 0;
    for (let i = 0; i < selectedRowKeys.length; i++ ) {
      for (let j = 0; j < this.state.bookList.length; j++) {
        if (selectedRowKeys[i] === this.state.bookList[j].key)
          totPrice += this.state.bookList[j].price_after * this.state.bookList[j].book_num;
      }
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // selections,
    };


    const onAddToOrderClick = () => {
      const user = JSON.parse(localStorage.getItem('user')).user_id;
      // console.log(data);
      // for (let i = 0; i < this.state.selections.length; ++i) {
      //   addToOrder({
      //     user_id: user,
      //     book_id: this.state.selections[i].book_id,
      //     book_num:this.state.selections[i].book_num,
      //   })
      // }
      const callback = () => {
        let data=[];
        for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
          for (let j = 0; j < this.state.bookList.length; j++) {
            if (this.state.selectedRowKeys[i] === this.state.bookList[j].key) {
              data.push(this.state.bookList[j].cart_item_id);
            }
          }
        }
        const callback1 = () => {this.setState({
          selectedRowKeys:[],
          selections:[]
        })}
        deleteCart(data, callback1);
      }
      addToOrder(this.state.selections, user,totPrice,  callback);
    }

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

              <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.bookList} />
              <p style={{ marginLeft: 8 , fontSize:"large", fontWeight:"bold"}}>
              {hasSelected ? `total price: ${totPrice}￥` : ''}
              </p>
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=>this.confirm()} >
                <Button type="dashed" danger>删除选中商品</Button>
                </Popconfirm>
              <Button type="primary"
                      danger size={"large"}
                      style={{marginLeft:"60%", width:"20%"}}
                      onClick={()=>onAddToOrderClick()}>
                下单</Button>
            </Content>
          </Layout>
        </Content>

      </Layout>

    );
  }

}
