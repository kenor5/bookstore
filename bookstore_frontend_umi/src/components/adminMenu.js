import React from "react";
import {ContainerOutlined, DesktopOutlined, MenuFoldOutlined, PieChartOutlined} from "@ant-design/icons";
import { Layout, Menu,Icon} from "antd";
import {history} from 'umi';
import {logout} from "../service/userService";

const bookAdminOnClick = () => {
  history.push("/admin");

};

const orderAdminOnClick = () => {
  history.push("/admin/manageOrder");
};

const userAdminOnClick = () => {
  history.push("/admin/manageUser");
};

const statisticsOnClick = () => {
  history.push("/admin/statistics");
};

const logOutOnClick = () => {
  logout();
};

export default function AdminMenu() {
  let def;
  if(history.location.pathname ==="/admin") def = '1';
  else if (history.location.pathname ==="/admin/manageUser") def = '3';
  else if (history.location.pathname ==="/admin/manageOrder") def = '2';
  else if (history.location.pathname ==="/admin/statistics") def = '4';

  return(
    <Menu defaultSelectedKeys={[def]} mode="inline">
      <Menu.Item key="1" onClick={bookAdminOnClick}>
        <Icon type="read" style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px'}}>书籍管理</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={orderAdminOnClick}>
        <Icon type="shopping-cart" style={{ fontSize: '18px'}} />
        <span style={{ fontSize: '16px'}}>订单管理</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={userAdminOnClick}>
        <Icon type="solution"  style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px'}}>用户管理</span>
      </Menu.Item>
      <Menu.Item key="4" onClick={statisticsOnClick}>
        <Icon type="user" style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px'}}>统计</span>
      </Menu.Item>
      <Menu.Item key="5" onClick={logOutOnClick}>
        <Icon type="user" style={{ fontSize: '18px'}}/>
        <span style={{ fontSize: '16px',color:'red'}}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
}
