import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore from './redux-helper/createStore.js'
import Header from './component/Header.js'
import '../static/global.css'

const store = createStore()

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter
      basename="/calendar"
      getUserConfirmation={getConfirmation}
    >
      <Route path="/test" component={Header} />
    </BrowserRouter>
  </Provider>),
  document.getElementById('app')
)
