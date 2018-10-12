// @flow

import * as React from 'react'
import {Link} from 'react-router-dom'
import {LoggedInRender, LoggedOutRender} from '../LoginSwitch/LoginSwitch'

export const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <Link to="/" className="navbar-brand">Listen With Randos</Link>

      <ul className="navbar-brand">
        <LoggedInRender>
          <li className="nav-item">Logout</li>
        </LoggedInRender>
        <LoggedOutRender>
          <li className="nav-item">Login</li>
        </LoggedOutRender>
      </ul>
    </div>
  </nav>
)
