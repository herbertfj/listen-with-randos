import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { LOGOUT } from "../../../domain/accessToken/accessToken"
import { AppAction } from "../../../domain/root"

type LogoutButtonDispatchProps = {
  logOut: () => any
}

const LogoutButtonComponent: React.SFC<LogoutButtonDispatchProps> = props => (
  <button
    type="button"
    className="btn btn-link nav-link"
    onClick={props.logOut}
  >
    Log out
  </button>
)

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  logOut() {
    dispatch({ type: LOGOUT })
  },
})

export const LogoutButton = connect(
  null,
  mapDispatchToProps
)(LogoutButtonComponent)
