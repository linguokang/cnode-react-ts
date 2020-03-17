import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/header/header'
import homePage from './views/homePage/homePage'; //首页组件
import Login from './views/login/login';
import Topic from './views/topic/topic'; //主题详情
import TopicCreate from './views/release/release'; //发布主题
import Collections from './views/collections/collections'
import User from './views/user/user'
import NotMatch from './views/404/404'; //404
import Messages from './views/messages/messages'; 


const RouteConfig = ()=>(
    <BrowserRouter>
        <Header />
	    <Switch>
	        <Route path="/" exact component={homePage} />
            <Route path="/login" component={Login} />
		    <Route path="/release/:id" component={TopicCreate} />
		    <Route path="/topic/:id" component={Topic} />
		    <Route path="/messages" component={Messages} />
            <Route path="/user/:loginname" exact component={User} />
            <Route path="/user/:loginname/collections" component={Collections} />
            <Route component={NotMatch} />
	    </Switch>
    </BrowserRouter>
);

export default RouteConfig;