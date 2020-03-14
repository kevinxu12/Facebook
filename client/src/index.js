
import React from 'react' ;
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { createStore, applyMiddleware} from 'redux';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(<Provider store = {store}> <App /> </Provider>, document.querySelector('#root'));
//ReactDOM.render(<App/>, document.querySelector('#root'));