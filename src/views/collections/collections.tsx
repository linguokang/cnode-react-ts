import React, { useState,useEffect } from 'react'
import './collections.scss'
import Sidebar from '../../components/sidebar/sidebar'
import { Link } from 'react-router-dom'
import API_CONFIG from '../../api'
import { message } from 'antd'
import List from '../../components/topics-list/TopicsList'
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios'

interface IProps extends RouteComponentProps<any>{
}

let Collections = (props:IProps) => {

    const [userCollections, setUserCollections] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        fetchCollections()
    },[])

    let fetchCollections = () => {
        axios.get(`${API_CONFIG.userCollections}${props.match.params.loginname}`)
        .then(res => {
            if( res.data.success ) {
                setUserCollections(res.data.data)
                setloading(false)
            }
        })
        .catch(e => {
            message.warning('不存在此用户');
            props.history.replace('/');
        });
    }

    return (
        <section className="index-section">
            <div className="topics-container collections">
                {
                    loading &&
                    <div className="collections-loading">loading...</div>
                }
                <div className="collections-title">
                    <Link to="/">主页</Link>
                    <em className="slashes"> / </em>
                    <span>{ props.match.params.loginname } 收藏的话题</span>
                </div>
                <List topics={userCollections} />
            </div>
            <Sidebar />
        </section>
    )
}

export default Collections;