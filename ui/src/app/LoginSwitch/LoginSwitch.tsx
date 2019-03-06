import * as React from "react"
import { connect } from "react-redux"
import { isLoggedIn, State } from "../../domain/root"

type SwitchBaseStateProps = {
  render: boolean
}

type SwitchBaseProps = SwitchBaseStateProps

const SwitchBase: React.FC<SwitchBaseProps> = ({ render, children }) => {
  return render ? <>{children}</> : null
}

const loggedInMapStateToProps = (state: State) => ({
  render: isLoggedIn(state),
})

const loggedOutMapStateToProps = (state: State) => ({
  render: !isLoggedIn(state),
})

export const LoggedInRender = connect(loggedInMapStateToProps)(SwitchBase)

export const LoggedOutRender = connect(loggedOutMapStateToProps)(SwitchBase)
