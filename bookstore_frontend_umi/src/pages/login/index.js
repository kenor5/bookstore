import React from "react";
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons';
import "./login.css"
import {login, register} from "../../service/userService";

const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let data = {
      username: values.username,
      password: values.password,
    }
    login(data);
  };

  return (
    <div
      className={"login-form-wrapper"}
      >
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a onClick={()=>props.onRegister()}>register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};

const RegisterForm = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let data = {
      username: values.username,
      password: values.password,
      password2:values.password2,
      email:values.email,
    }
    register(data);
  };

  return (
    <div
      className={"login-form-wrapper"}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="password2"
          rules={[{ required: true, message: 'Please input your Password again!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password again"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          <a onClick={()=>props.back()}>go back</a>
        </Form.Item>
      </Form>
    </div>
  );
};





export default class Login extends React.Component{
  constructor() {
    super();
    this.state ={
      register: 0
    }
  }

  render() {
    return(
      <div>
        <img src={require("../../asset/img/bgi.webp")} alt={"miss pic"} className="login-background"/>
        {this.state.register === 0 ?
          <NormalLoginForm
            onRegister={() => this.setState({register: 1})}
          /> :
          <RegisterForm
            back={()=>this.setState({register:0})}
          />
        }
      </div>
    );
  }
}
