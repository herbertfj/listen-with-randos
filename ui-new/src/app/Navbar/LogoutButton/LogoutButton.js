// @flow

import * as React from 'react'
import type {Dispatch} from '../../../domain/store/actions/actions'
import {LOGOUT} from '../../../domain/store/actions/actions'
import {connect} from 'react-redux'

type LogoutButtonDispatchProps = {
  logOut: () => any
}

const LogoutButtonComponent = (props: LogoutButtonDispatchProps) => (
  <button type="button" className="btn btn-link nav-link" onClick={props.logOut}>
    Log out
  </button>
)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logOut() {
    dispatch({type: LOGOUT})
  },
})

export const LogoutButton = connect(
  null,
  mapDispatchToProps,
)(LogoutButtonComponent)
