import React, { useState,useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import Sidebar from '../../components/sidebar/sidebar'
import API_CONFIG from '../../api'
import { Link } from 'react-router-dom'
import './messages.scss'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom';
import { Istore, Imessage } from '../../interfaces/interface'

interface IProps extends RouteComponentProps<any> {
    store: Istore
}

const Messages = inject("store")(observer((props:IProps) => {


    const [hasReadMessages, setHasReadMessages] = useState([])
    const [hasNotReadMessages, setHasnotReadMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
        markAllRead()
    },[])

    // 获取已读和未读消息
    const fetchMessages = () => {
        axios.get(API_CONFIG.fetchMessages)
        .then(res => {
            if( res.data.success ) {
                setLoading(false)
                setHasReadMessages(res.data.data.has_read_messages)
                setHasnotReadMessages(res.data.data.hasnot_read_messages)
            }
        })
        .catch(e => {
            props.history.replace('/');
        });
    }

    const markAllRead = () => {
        if( props.store.messageCount > 0 ) {
            axios.post(API_CONFIG.messageMarkAll)
            .then(res => {})
            .catch(e => e);
        }
    }


    // 消息组件
    const Msg = ( props: any ) => {
        return (
            <div className="msg-list">
                { loading && <div className="msg-loading"></div> }
                { props.messages.length === 0 && <div className="no-msg">暂无消息</div> }
                { props.messages.length }
                <ul>
                {
                    props.messages.map((item: Imessage, index: number) => {
                        return (
                            <li key={item.id}>{item.type}
                                {
                                    item.type === 'reply' ?
                                    <div>
                                        <Link to={`/user/${item.author.loginname}`}>{ item.author.loginname }</Link>
                                        <span> 回复了你的话题 </span>
                                        <Link to={`/topic/${item.topic.id}`}>{ item.topic.title }</Link>
                                    </div>
                                    : item.type == 'at'
                                    ?
                                    <div>
                                        <Link to={`/user/${item.author.loginname}`}>{ item.author.loginname }</Link>
                                        <span> 在话题 </span>
                                        <Link to={`/topic/${item.topic.id}`}>{ item.topic.title }</Link>
                                        <span> 中@了你</span>
                                    </div>
                                    : ''
                                }
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    };
    return (
        <section className="index-section">
            <div className="topics-container messages">
                <div className="new-msg">
                    <div className="top">
                        <Link to="/">主页</Link>
                        <em> / </em>
                        <span>新消息</span>
                    </div>
                    <Msg messages={hasReadMessages}/>
                </div>
                <div className="past-times">
                    <div className="top">已读消息</div>
                    <Msg messages={hasNotReadMessages}/>
                </div>
            </div>
            <Sidebar />
        </section>
    )
}))


export default Messages;