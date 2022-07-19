import React from "react";
import {ContainerOutlined, DesktopOutlined, MenuFoldOutlined, PieChartOutlined} from "@ant-design/icons";
import { Layout, Menu,Icon} from "antd";
import {history} from 'umi';

const bookOnClick = () => {
  history.push("/");

};

const cartOnClick = () => {
  history.push("/cart");
};

const orderOnClick = () => {
  history.push("/order");
};

const profileOnClick = () => {
  history.push("/profile");
};

export default function MyMenu() {
  let def;
  if(history.location.pathname ==="/") def = '1';
  else if (history.location.pathname ==="/order") def = '3';
  else if (history.location.pathname ==="/cart") def = '2';
  else if (history.location.pathname ==="/profile") def = '4';

  return(
    <Menu defaultSelectedKeys={[def]} mode="inline">
      <Menu.Item key="1" onClick={bookOnClick}>
        <Icon type="read" style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px'}}>书籍列表</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={cartOnClick}>
        <Icon type="shopping-cart" style={{ fontSize: '18px'}} />
        <span style={{ fontSize: '16px'}}>购物车</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={orderOnClick}>
        <Icon type="solution"  style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px'}}>我的订单</span>
      </Menu.Item>
      <Menu.Item key="4" onClick={profileOnClick}>
        <Icon type="user" style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px'}}>个人资料</span>
      </Menu.Item>
    </Menu>
  );
}
