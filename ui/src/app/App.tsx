import * as React from "react"
import { Route } from "react-router"
import { routes } from "../config/routes"
import { ConnectedChatWindow } from "./ChatWindow/ChatWindow"
import { LoggedInRender } from "./LoginSwitch/LoginSwitch"
import { Navbar } from "./Navbar/Navbar"
import { ConnectedReceiveToken } from "./ReceiveToken/ReceiveToken"
import { Registration } from "./Registration/Registration"

export const App: React.SFC = () => (
  <>
    <Navbar />

    <div className="container">
      <Route path={routes.HOME} exact={true}>
        <LoggedInRender>
          <ConnectedChatWindow />
        </LoggedInRender>
      </Route>

      <Route path={routes.RECEIVE_TOKEN} component={ConnectedReceiveToken} />
      <Route path={routes.REGISTER} component={Registration} />
    </div>
  </>
)
