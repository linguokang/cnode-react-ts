import React, { useState,useEffect } from 'react'
import { message } from 'antd';
import './login.scss'
import { observer, inject } from 'mobx-react'
import API_CONFIG from '../../api'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom';
import { Istore } from '../../interfaces/interface'

interface IProps extends RouteComponentProps<any>{
    store:Istore
}

const Login = inject("store")(observer((props:IProps) => {


    const [accessToken, setAccessToken] = useState(window.localStorage.save_access_token || '');

    useEffect(() => {
        
    })

    /**
     * @param {Number} type 
     * @param {event} e 
     */
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                props.store.login(accessToken, res.data);
                props.history.replace('/');
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
                    <a href="https://cnodejs.org/setting" target="_blank" rel="noopener noreferrer">如何获取Access Token？</a>
                </div>
                <div className="submit user-select-none" onClick={handleSubmit}>Sign in</div>
            </div>
        </section>
    );
}))

export default Login;