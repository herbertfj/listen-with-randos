// @flow

import * as React from 'react'
import {Link} from 'react-router-dom'
import {LoggedInRender, LoggedOutRender} from '../LoginSwitch/LoginSwitch'
import {LoginLink} from '../LoginLink/LoginLink'
import {LogoutButton} from './LogoutButton/LogoutButton'

export const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <Link to="/" className="navbar-brand">Listen With Randos</Link>

      <ul className="navbar-nav">
        <LoggedInRender>
          <li className="nav-item">
            <LogoutButton/>
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
