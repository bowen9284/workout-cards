import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { makeAuthRouting } from './routing';

// const store = createStore(reducer);

ReactDOM.render(makeAuthRouting(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
