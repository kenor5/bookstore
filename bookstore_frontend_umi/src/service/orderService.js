import {axios, serverUrl} from "../utils/axios";
import {message} from "antd";
import {history} from 'umi';
import qs from "qs";

export const getOrder = (data, callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getOrder',
    params: {
      user_id:data
    }
  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getOrders = (callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getOrders',

  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const removeOrder = (data,callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/removeOrder',
    params: {
      order_id:data
    }
  }).then(response => {
    callback();
  }).catch(error => {
    console.log(error);
  })
}



export const getAdminOrderByName = (data,callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getAdminOrderByName',
    params: {
      name:data
    }
  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getAdminOrderByRange = (data,callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getAdminOrderByRange',
    params: {
      start: data[0],
      end: data[1]
    }
  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getUserOrderByRange = (user_id,data,callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getUserOrderByRange',
    params: {
      user_id:user_id,
      start: data[0],
      end: data[1]
    }
  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getUserOrderByName = (user_id,data,callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getUserOrderByName',
    params: {
      user_id:user_id,
      name:data
    }
  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const addToOrder = (data, user_id,price, callback) => {
  let book_ids = [], book_nums = [];

  console.log(data);
  for (const i in data) {
    book_ids.push(data[i].book_id);
    book_nums.push(data[i].book_num);
  }
  let params = {book_ids:book_ids, book_nums:book_nums, user_id: user_id, price:price};
  axios({
    method: 'GET',
    url: serverUrl + '/addToOrder',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, {
        indices: false
      })
    }
  }).then(response => {
    callback();
    message.success("成功");
  }).catch(error => {
    console.log(error);
  })
}
