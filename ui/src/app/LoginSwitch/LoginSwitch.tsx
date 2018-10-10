import * as React from "react"
import { connect } from "react-redux"
import { State } from "../../domain/root"

type SwitchBaseStateProps = {
  render: boolean
}

type SwitchBaseProps = SwitchBaseStateProps

const SwitchBase: React.SFC<SwitchBaseProps> = ({ render, children }) => {
  return render ? <>{children}</> : null
}

const isLoggedIn = (state: State) => !!state.accessToken

const loggedInMapStateToProps = (state: State) => ({
  render: isLoggedIn(state),
})

const loggedOutMapStateToProps = (state: State) => ({
  render: !isLoggedIn(state),
})

export const LoggedInRender = connect(loggedInMapStateToProps)(SwitchBase)

export const LoggedOutRender = connect(loggedOutMapStateToProps)(SwitchBase)
