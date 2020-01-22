import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom';

// const history = createBrowserHistory();

import IndexList from './components/IndexList/IndexList'; //首页组件
import homePage from './views/homePage/homePage'; //首页组件
import Login from './views/login/login';
import Topic from './views/topic/topic'; //主题详情
// import TopicCreate from '../Component/TopicCreate'; //发布主题
// import MyMessages from '../Component/MyMessages'; //我的消息
// import UserView from '../Component/UserView'; //我的个人中心
// import Signin from '../Component/Signin'; //登录
// import Signout from '../Component/Signout'; //退出
import NotMatch from './views/404/404'; //404

// const HomePage =() => <div>Home Page</div>

const RouteConfig = ()=>(
    <BrowserRouter>
	    <Switch>
	      <Route path="/test" exact component={IndexList} />
	      <Route path="/" exact component={homePage} />
          <Route path="/login" component={Login} />
	      {/* <Route path="/button" exact component={IndexList} /> */}
		    {/* {routes.map((route, index) => (
			    <Route
				    key={index}
				    path={route.path}
				    exact={route.exact}
				    component={route.component}
			    />
		    ))} */}
		    {/*<Route path="/topic/create" component={TopicCreate} />*/}
		    <Route path="/topic/:id" component={Topic} />
		    {/*<Route path="/my/messages" component={MyMessages} />*/}
		    {/*<Route path="/user/:loginname" component={UserView} />*/}
		    {/*<Route path="/signin" component={Signin} />*/}
		    {/*<Route path="/signout" component={Signout} />*/}
		    {/* <Redirect from='' to="/" /> */}
            <Route component={NotMatch} />
	    </Switch>
    </BrowserRouter>
);

export default RouteConfig;