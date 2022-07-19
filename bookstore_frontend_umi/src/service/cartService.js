import {axios, serverUrl} from "../utils/axios";
import {message} from "antd";
import {history} from 'umi';
import qs from "qs";


export const addToCart = (data) => {
  axios({
    method: 'POST',
    url: serverUrl + '/addToCart',
    params: {
      user_id:data.user_id,
      book_id:data.book_id
    }
  }).then(response => {
    // console.log(response.data);
    message.success("success")
  }).catch(error => {
    console.log(error);
  })
}

export const getCart = (data, callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getCart',
    params: {
      user_id:data
    }
  }).then(response => {
    // console.log(response.data);
    // message.success("success")
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const deleteCart = (data, callback) => {
  let params = {delete_ids:data};
  axios({
    method: 'POST',
    url: serverUrl + '/deleteCartByIds',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, {
        indices: false
      })
    }

  }).then(response => {
    callback();
  }).catch(error => {
    console.log(error);
  })
}


