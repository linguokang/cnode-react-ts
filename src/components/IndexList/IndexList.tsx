import React, { Component } from 'react';
import {NavLink as Link } from 'react-router-dom';

// import axios from 'axios';
import './IndexList.scss'


interface IProps {
  tab: string,
}


class Nav extends Component<IProps> {
    render() {
        // var setCur = {};
        let setCur: {[index: string]:any} = {}
        setCur[this.props.tab] = 'on';
        return (
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li className={setCur.all}>
                        <Link to="/" activeClassName="active">全部</Link>
                    </li>
                    <li className={setCur.good}>
                        <Link to="/?tab=good" activeClassName="active">精华</Link>
                    </li>
                    <li className={setCur.share}>
                        <Link to="/?tab=share" activeClassName="active">分享</Link>
                    </li>
                    <li className={setCur.ask}>
                        <Link to="/?tab=ask" activeClassName="active">问答</Link>
                    </li>
                    <li className={setCur.job}>
                        <Link to="/?tab=job" activeClassName="active">招聘</Link>
                    </li>
                </ul>
                <div className="height"></div>
            </nav>
        );
    }
    shouldComponentUpdate(np:{tab:string}) {
        return this.props.tab !== np.tab; //tab和之前的不一致，组件才需要更新，否则不更新，提升性能
    }
    componentDidMount() {
        // const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        // axios
        // .get("/api/login")
        // .then((response) => {
        //     console.log(response.data);
        //     _this.setState({
        //     users: response.data,
        //     isLoaded: true
        //     });
        // })
        // .catch(function(error) {
        //     console.log(error);
        //     _this.setState({
        //     isLoaded: false,
        //     error: error
        //     });
        // });
    }
}

// interface IProps {
//   color: string,
//   size?: string,
// }
// interface IState {
//   count: number,
// }
// class Trst extends Component<IProps, IState> {
//   public state = {
//     count: 1,
//   }
//   public render () {
//     return (
//       <div>Hello world</div>
//     )
//   }
// }


class Main extends Component {
    constructor(props:any) {
        super(props);
    }
    render() {
        // var {data, loadAnimation, loadMsg} = this.props.state;
        // var tab = queryString.parse(this.props.location.search).tab || 'all';
        var tab = 'all';
        var color = 123
        return (
            <div className="index-list-box">
                <Nav tab={tab} />
                {
                    // data.length > 0 ? <List list={data} /> : null
                }
                {/* <Footer index="0" /> */}

                {/* <Trst color={color}/> */}
            </div>
        );
    }
}

export default Main; // 别忘了使用 export default ！