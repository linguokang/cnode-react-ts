
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { useState,useEffect } from 'react'
import Router from './router';
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { message } from 'antd'


const App = inject("store")(observer(({ store }) => {

    // const [state, setstate] = useState(0);

    useEffect(() => {
        _axiosConfig()
        store.checkLogin()
    })

    let _axiosConfig = () => {
        axios.interceptors.request.use(config => {
            // post请求默认发送参数
            if( config.method === 'post' ) {
                config.data = Object.assign({
                    accesstoken: store.accessToken,
                }, config.data);
            }
            // 如果是发送GET请求
            if( config.method === 'get' ) {
                config.params = Object.assign({
                    accesstoken: store.accessToken,
                }, config.params);
            }
            return config;
        }, e => {
            message.warning('API请求失败!');
            return Promise.reject(e);
        });
        
        // 响应拦截器
        axios.interceptors.response.use(res => {
            return res;
        }, e => {
            message.warning('请求超时或服务器出错!!!');
            return Promise.reject(e);
        });
    }

    return (
       <Router />
    )
}))



export default App
