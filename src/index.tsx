import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'simplemde/dist/simplemde.min.css';
import 'antd/dist/antd.css';
import './assets/scss/style.scss'
import './assets/scss/media.scss'
import Store from './store/index'
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker';


const store = new Store();
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
