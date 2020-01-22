import React, { Component,useState,useEffect } from 'react'
import { message } from 'antd';
import './login.scss'
import { observer, inject } from 'mobx-react'
import API_CONFIG from '../../api'
import axios from 'axios'


const Login = inject("store")(observer(({ store }) => {


    const [accessToken, setAccessToken] = useState(window.localStorage.save_access_token || '');

    useEffect(() => {
        
    })

    /**
     * @param {Number} type 
     * @param {event} e 
     */
    let handleChange = (e:any) => {
        // this.setState({
        //     accessToken: e.target.value.trim()
        // })
        setAccessToken(e.target.value.trim())
    }

    let handleSubmit = () => {
        if( !accessToken ) return message.warning('Access Token不能为空');
        axios.post(API_CONFIG.login, {
            accesstoken: accessToken
        })
        .then(res => {
            if( res.data.success ) {
                store.login(accessToken, res.data);
            }
        })
        .catch(e => e);

        
    }

    return (
        <section className="login">
            <div className="box">
                <div className="input last">
                    <input 
                        type="text" 
                        // maxLength="50" 
                        value={accessToken} 
                        placeholder="Access Token" 
                        onChange={handleChange} />
                        {/* onChange={setAccessToken(e.target.value.trim())} /> */}
                </div>
                <div className="get-access-token">
                    <a href="https://cnodejs.org/setting" target="_blank" rel="noopener noreferer">如何获取Access Token？</a>
                </div>
                <div className="submit user-select-none" onClick={handleSubmit}>Sign in</div>
            </div>
        </section>
    );
}))

export default Login;