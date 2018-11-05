import * as React from "react"
import { Link } from "react-router-dom"
import { LoginLink } from "../LoginLink/LoginLink"
import { LoggedInRender, LoggedOutRender } from "../LoginSwitch/LoginSwitch"
import { LogoutButton } from "./LogoutButton/LogoutButton"
import { DisplayName } from "../DisplayName/DisplayName"

export const Navbar: React.SFC = () => (
  <nav className="navbar navbar-expand">
    <div className="container">
      <Link to="/" className="navbar-brand">
        Listen With Randos
      </Link>
      <ul className="navbar-nav">
        <LoggedInRender>
          <li className="nav-item">
            <div className="navbar-text">
              <DisplayName />
            </div>
          </li>
          <li className="nav-item">
            <LogoutButton />
          </li>
        </LoggedInRender>

        <LoggedOutRender>
          <li className="nav-item">
            <LoginLink>Log in</LoginLink>
          </li>
        </LoggedOutRender>
      </ul>
    </div>
  </nav>
)
