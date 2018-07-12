import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Comments from './Comments';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Comments />, document.getElementById('root'));
registerServiceWorker();
