import React, { Component } from 'react'
import './header.scss'
import { observer, inject } from 'mobx-react'
import  { Link } from 'react-router-dom'
import { message } from 'antd';
import { Istore } from '../../interfaces/interface'

interface IProps {
    store?: Istore
}

/* eslint-disable */
@inject(stores => stores)
@observer class Header extends Component<IProps> {

    // 退出登录
    logout = () => {
        this.props.store.logout();
        message.success('已登出！');
    }

    render () {
        return (
            <header className="header">
                <div className="header-box">
                    <Link to="/" className="logo user-select-none">
                        <img src="https://xjh22222228.github.io/nav/assets/icon/frontend/065.svg" alt="logo" />
                    </Link>
                    <nav className="nav">
                        <Link to="/">首页</Link>
                        { this.props.store.isLogin && <Link to="/messages" className={this.props.store.messageCount > 0 ? 'unread-msg' : ''}>未读消息</Link> }
                        <a href="https://github.com/linguokang" ref="noopenr noreferer" target="_blank">关于作者</a>
                        {
                            this.props.store.isLogin ? 
                            <a href="javascript:void(0)" onClick={this.logout}>退出</a> : 
                            <Link to="/login">登录</Link>
                        }
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;