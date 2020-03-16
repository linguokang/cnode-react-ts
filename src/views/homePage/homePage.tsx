import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './homePage.scss'
import API_CONFIG from '../../api/index'
import Sidebar from '../../components/sidebar/sidebar'
import { querystring } from '../../utils/utils'
import { Pagination } from 'antd'
import axios from 'axios'
import List from '../../components/topics-list/TopicsList'
import { RouteComponentProps } from 'react-router-dom';
import { Itopics } from '../../interfaces/interface'

interface IProps extends RouteComponentProps<any>{
    
}

const HomePage = (props:IProps) => {

    const [tab, setTab] = useState(querystring(props.location.search).tab || '')
    const [page, setPage] = useState(parseInt(querystring(props.location.search).page) || 1)
    const [total, setTotal] = useState(9999)
    const [topics, setTopics] = useState([])
    const [mark, setMark] = useState(true)

    useEffect(() => {
        fetchTopics()
    },[tab, page])

    useEffect(() => {
        setTab(querystring(props.location.search).tab || '')
        setPage(parseInt(querystring(props.location.search).page) || 1)
    }, [props.location])


    /**
     * @func 获取主题列表
     * @param {Number} page
     * @param {String} tab
     */
    const fetchTopics = () => {
        setMark(true)
        var beforeTime = Date.now();
        axios.get(API_CONFIG.topics, {
            params: {
                limit: 40,
                mdrender: false,
                tab: querystring(props.location.search).tab || 'all',
                page: page,
            }
        })
        .then(res => {
            var afterTime = Date.now() - beforeTime;
            if( afterTime <= 300 ) {
                setTimeout(() => {
                    setMark(false)
                }, 300 - afterTime)
            } else {
                setMark(false)
            }
            if( res.data.success ) {
                setTopics(res.data.data)
            } 
        })
        .catch(e => e);
    }

    const currentChange = (page:number) => {
        var tab = querystring(props.location.search).tab || 'all';
        props.history.push({
            pathname: '/',
            search: `?tab=${tab}&page=${page}`,
        });
        window.scrollTo(0, 0);
    }

    const navList = [
        {router:'',name:'全部'},
        {router:'good',name:'精华'},
        {router:'share',name:'分享'},
        {router:'ask',name:'问答'},
        {router:'job',name:'招聘'},
        {router:'dev',name:'客户端测试'},
    ]

    return (
        <section className="index-section">
            <div className="topics-container index-container">
                {/* 导航 */}
                <nav className="nav">
                    {
                        navList.map((item) => {
                            return <NavLink key={item.router} to={`/?tab=${item.router}`} isActive={(match, location) => {
                                const tab = querystring(location.search).tab
                                return tab === item.router;
                            }}>{item.name}</NavLink>
                        })
                    }
                </nav>
                <div className="topics-list">
                    <div className="mark-box" style={{display: !mark ? 'none' : ''}}>
                        <div className="mark-line"></div>
                        <div className="mark-line"></div>
                        <div className="mark-line"></div>
                    </div>
                    <List topics={topics} />
                </div>
                <div className="pagination-box">
                    <Pagination 
                        current={page} 
                        onChange={currentChange} 
                        total={total} 
                        pageSize={40} />
                </div>
            </div>
            {/* 侧边栏 */}
            <Sidebar />
        </section>
    );
}

export default HomePage;