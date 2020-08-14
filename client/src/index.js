import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux' 
import {createStore,applyMiddleware} from 'redux'
import itemsReducer from './reducers/items_reducer'
import thunk from 'redux-thunk'
import {loadItems} from './actions/item_actions'


const initialState = [
  {
    isLoading : true,
    selectedCategory : 'ALL',
    isSearching : false,
    searchParam : '',
    error:null,
    items : [],
    cart : [],
    categorized : [],
    searchResult : null
  }
]


const store = createStore(itemsReducer,initialState, applyMiddleware(thunk))
store.dispatch(loadItems())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
