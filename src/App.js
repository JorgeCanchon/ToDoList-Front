import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import TodoContainer from './containers/TodoContainer';
import allReducers from './redux'

const store = createStore(allReducers, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TodoContainer />
    </Provider>
  );
}

export default App;
