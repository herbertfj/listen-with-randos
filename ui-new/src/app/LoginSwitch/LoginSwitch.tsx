import * as React from 'react'
import {connect} from 'react-redux'
import {State} from '../../domain/root'

type SwitchBaseStateProps = {
  render: boolean,
}

type SwitchBaseProps = SwitchBaseStateProps

const SwitchBase: React.SFC<SwitchBaseProps> = (props) => {
  return props.render ? <>{props.children}</> : null
}

const isLoggedIn = (state: State): boolean => !!state.accessToken

const loggedInMapStateToProps = (state: State) => ({
  render: isLoggedIn(state),
})

const loggedOutMapStateToProps = (state: State) => ({
  render: !isLoggedIn(state),
})

export const LoggedInRender = connect(
  loggedInMapStateToProps,
)(SwitchBase)

export const LoggedOutRender = connect(
  loggedOutMapStateToProps,
)(SwitchBase)
