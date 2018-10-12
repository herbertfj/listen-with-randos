// @flow

import * as React from 'react'
import './App.css'
import {Navbar} from './Navbar/Navbar'
import {Route} from 'react-router-dom'
import {ConnectedReceiveToken} from './ReceiveToken/ReceiveToken'

export const App = () => (
  <div>
    <Navbar/>

    <div className="container">
      <Route path="/" exact={true}>
      </Route>

      <Route path="/receive" component={ConnectedReceiveToken}/>
    </div>
  </div>
)
