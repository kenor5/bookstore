import {axios, serverUrl} from "../utils/axios";
import {message} from "antd";
import {history} from 'umi';
import qs from "qs";


export const getBooks = (callback) => {
  axios({
    method: 'GET',
    url: serverUrl + '/getBooks',
    params: {
    }
  }).then(response => {
    // console.log(response.data);
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getBook = (book_id, callback) => {

  axios({
    method: 'GET',
    url: serverUrl + '/getBook',
    params: {
      book_id:book_id
    }
  }).then(response => {
    // console.log(response.data);
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const updateBook = (values,book_id, callback) => {
  if (
    (values.image === undefined || values.image === "")&&
    (values.name === undefined || values.name === "")&&
    (values.type === "" || values.type === undefined)&&
    (values.author === undefined  || values.author === "")&&
    (values.price_after === undefined || values.price_after === "")&&
    (values.description === undefined || values.description === "")
  )
    return;
  axios({
    method: 'POST',
    url: serverUrl + '/updateBook',
    params: {
      book_id:book_id,
      image:(values.image === undefined || values.image === "") ? "!": values.image,
      name:(values.name === undefined || values.name === "") ? "!": values.name,
      type:(values.type === "" || values.type === undefined)? "!": values.type,
      author:(values.author === undefined  || values.author === "")? "!": values.author,
      price_after:(values.price_after === undefined || values.price_after === "")? "!": values.price_after,
      description:(values.description === undefined || values.description === "")? "!": values.description
    }
  }).then(response => {
    // console.log(response.data);
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const deleteBook = (book_id, callback) => {

  axios({
    method: 'POST',
    url: serverUrl + '/updateBook',
    params: {
      book_id:book_id,
      image:"!",
      name: "!",
      type:"!",
      author: "!",
      price_after:"!",
      description: "!"
    }
  }).then(response => {
    callback();
  }).catch(error => {
    console.log(error);
  })

}

export const getBookByIds = (data, callback) => {
  let params = {book_ids:data};
  axios({
    method: 'GET',
    url:serverUrl + '/getBookByIds',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, {
        indices: false
      })
    }

  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getBooksByName = (data, callback) => {
  let params = {search:data};
  axios({
    method: 'GET',
    url:serverUrl + '/getBooksByName',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, {
        indices: false
      })
    }

  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.log(error);
  })
}

export const getBookName = (id, callback1) => {
  const callback = (val) => {
    callback1(val.name);
  }
  getBook(id, callback);
}


export const newBook = (values, callback) => {
console.log(values);
  axios({
    method: 'POST',
    url: serverUrl + '/newBook',
    params: {
      isbn:values.isbn        ,
      name:values.name        ,
      type:values.type        ,
      author:values.author      ,
      price_before:values.price + 20,
      price_after:values.price ,
      description:values.description ,
      inventory:values.inventory   ,
      image:values.image
    }
  }).then(response => {
    callback();
  }).catch(error => {
    console.log(error);
  })

}

