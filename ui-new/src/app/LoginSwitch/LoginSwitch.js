// @flow

import type {State} from '../../domain/store/state'
import {connect} from 'react-redux'
import * as React from 'react'

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

const mapStateToProps = (state: State) => ({
  render: isLoggedIn(state)
})

export const LoggedInRender = connect({
  mapStateToProps,
  mapDispatchToProps: null,
})(SwitchBase)

export const LoggedOutRender = connect({
  mapStateToProps: (state: State) => ({
    render: !isLoggedIn(state),
  }),
})(SwitchBase)
