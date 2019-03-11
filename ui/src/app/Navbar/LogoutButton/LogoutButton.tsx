import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { logOut } from "../../../domain/user/user"
import { AppAction } from "../../../domain/root"

type LogoutButtonDispatchProps = {
  logOut(): any
}

const LogoutButtonComponent: React.FC<LogoutButtonDispatchProps> = props => (
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
    dispatch(logOut())
  },
})

export const LogoutButton = connect(
  null,
  mapDispatchToProps
)(LogoutButtonComponent)
