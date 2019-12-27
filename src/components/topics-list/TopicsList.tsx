import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TopicsList.scss'
import { Link } from 'react-router-dom'
import { fromNow } from '../../utils/utils'
import Item from 'antd/lib/list/Item';

interface item {
    id:string,
    reply_count:string,
    author:{
        loginname:string,
        avatar_url:string,
    }
    visit_count:string,
    last_reply_at:string,
    title:string,
    tab:any
}

interface IProps {
    topics: Array<item>,
}
// interface IState {
//     page: number,
//     total: number,
//     topics: number,
//     mark:boolean,
// }

class TopicsList extends Component<IProps> {

    constructor(props:IProps) {
        super(props)
        // this.state = {
        //     page: 1,        // 当前页
        //     total: 9999,    // 总条数
        //     topics: [],     // 主题列表
        //     mark: false,
        // }
    }

    componentDidMount() {
        console.log(234)
    }

    // componentDidUpdate(prevProps, prevState, prevContext) {

    // }

    tag = (topic:any) => {
        if (topic.top) {
            return {
                text: '置顶',
                className: 'top',
            }
        }
        if (topic.good) {
            return {
                text: '精华',
                className: 'good',
            }
        }
        switch (topic.tab) {
            // 问答
            case 'ask':
                return {
                    text: '问答',
                    className: topic.tab
                };
            // 分享
            case 'share':
                return {
                    text: '分享',
                    className: topic.tab
                };
            // 招聘
            case 'job':
                return {
                    text: '招聘',
                    className: topic.tab
                };
            // 精华
            case 'good':
                return {
                    text: '精华',
                    className: topic.tab
                };
            // 测试
            case 'dev':
                return {
                    text: '测试',
                    className: topic.tab
                };
            default:
                return {
                    text: '',
                    className: 'default'
                }
        }
    }

    render() {
//         let myName = 'Tom';

// console.log(`My name is ${myNane}`);
// console.log(`My name is ${myName.toStrng()}`);
// console.log(`My name is ${myName}`)
        return (
            <ul className="unique-topics-list">
                {
                    this.props.topics.map(item => {
                        return (
                            <li key={item.id}>
                                <div className="avatar">
                                    <Link to={`/user/${item.author.loginname}`}>
                                        <img src={item.author.avatar_url} alt="头像" title={item.author.loginname} />
                                    </Link>
                                </div>
                                {
                                    item.reply_count !== undefined &&
                                    <div className="reply-view">{item.reply_count}/{item.visit_count}</div>
                                }
                                {
                                    item.tab && <span className={`tag ${this.tag(item).className}`}>{this.tag(item).text}</span>
                                }
                                <Link to={`/topic/${item.id}`} className="title">{item.title}</Link>
                                <div className="last-reply-time">
                                    <time>{fromNow(item.last_reply_at)}</time>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

// TopicsList.propTypes = {
//     topics: PropTypes.array.isRequired
// }

export default TopicsList;

// class topicslist extends Component{
//     render () {

//         console.log(this.props.topics);

//         return (
//             <ul className="list">
//                 {
//                     this.props.topics.map((topice)=>{
//                         return (
//                             <li key={topice.id}>
//                                 {/* {topice.id} */}
//                                 <div className="avavter">
//                                     <Link to={`/user/${topice.author.loginname}`}>
//                                         <img src={topice.author.avatar_url} alt="touxiang" title={topice.author.loginname}></img>
//                                     </Link>
//                                 </div>
//                                 {
//                                     topice.reply_count !== undefined && <div className="reply">{topice.reply_count}/{topice.visit_count}</div>
//                                 }
//                                 <Link to={`/topic/${topice.id}`} className="title">{topice.title}</Link>
//                                 <div className="last-re">
//                                     <time>{ fromNow(topice.last_reply_at) }</time>
//                                 </div>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//         )
//     }
// }

// export default topicslist