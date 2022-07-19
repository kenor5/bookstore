import {axios, serverUrl} from "../utils/axios";
import {message} from "antd";
import {history} from 'umi';


export const register = (data) => {
  axios({
    method: 'POST',
    url: serverUrl + '/register',
    params: {

      username: data.username,
      password: data.password,
      password2:data.password2,
      email:    data.email,
    }
  }).then(response => {
    console.log(response)
    if (response.status === 200) {
      switch (JSON.parse(JSON.stringify(response.data))) {
        case 0: {
          message.success("注册成功");
          history.push("/login");
          break;
        }
        case 1: {
          message.error("用户名已被使用");
          break;
        }
        case 2: {
          message.error("两次密码不一致");
          break;
        }
        case 3: {
          message.error("邮箱格式不正确");
          break;
        }
      }

    }

  }).catch(error => {
    console.log(error)
    message.error("发生错误");
  })
}

export const login = (data) => {
  axios({
    method: 'GET',
    url: serverUrl + '/checkUser',
    params: {
      username: data.username,
      password: data.password,
    }
  }).then(response => {
    console.log(response)
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data === '') {
        message.error("账号或密码错误");
        return;
      }
      if (JSON.parse(JSON.stringify(response.data)).state === 0)
        message.error("账号被禁用");
      else {
        if (JSON.parse(JSON.stringify(response.data)).user_type === 0)
          history.push("/admin");
        else
          history.push("/");
        message.success("登陆成功")
      }
    }

  }).catch(error => {
    console.log(error)
    message.error("账号或密码错误");
  })
}

export const logout = () => {
      localStorage.removeItem("user");
      history.push("/login");
};

export const getUsers = (callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getUsers',
    params: {
    }
  }).then(response => {
    console.log(response)
    callback(response.data);
  }).catch(error => {
    console.log(error)
  })
}

export const updateUser = (values, callback) => {
  if(values.user_id === undefined || values.user_id === "") return;
  axios({
    method: 'GET',
    url: serverUrl + '/updateUser',
    params: {
      user_id: values.user_id,
      username:(values.username === "" || values.username === undefined)? "!": values.username,
      password:(values.password === "" || values.password === undefined)? "!": values.password,
      state: (values.state === "" || values.state === undefined)? "!": values.state,
    }
  }).then(response => {
    console.log(response);
    callback();
  }).catch(error => {
    console.log(error)
  })
}


