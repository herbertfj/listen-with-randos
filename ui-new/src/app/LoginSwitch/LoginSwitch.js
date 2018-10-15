// @flow

import {connect} from 'react-redux'
import * as React from 'react'
import type {State} from '../../domain/store/reducer/reducer'

type SwitchBaseOwnProps = {
  children?: React.Node
}

type SwitchBaseStateProps = {
  render: boolean,
}

type SwitchBaseProps = SwitchBaseOwnProps & SwitchBaseStateProps

const SwitchBase: React.StatelessFunctionalComponent<SwitchBaseProps> = (props: SwitchBaseProps) => {
  return props.render ? props.children || null : null
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
