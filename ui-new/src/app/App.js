// @flow

import * as React from 'react'
import './App.css'
import {Navbar} from './Navbar/Navbar'
import {Route} from 'react-router-dom'
import {ConnectedReceiveToken} from './ReceiveToken/ReceiveToken'
import {LoggedInRender} from './LoginSwitch/LoginSwitch'
import {ConnectedChatWindow} from './ChatWindow/ChatWindow'
import {routes} from '../config/routes'

export const App = () => (
  <div>
    <Navbar/>

    <div className="container">
      <Route path={routes.HOME} exact={true}>
        <LoggedInRender>
          <ConnectedChatWindow/>
        </LoggedInRender>
      </Route>

      <Route path={routes.RECEIVE_TOKEN} component={ConnectedReceiveToken}/>
    </div>
  </div>
)
