// @flow

import type {State} from '../../domain/store/state'
import {connect} from 'react-redux'
import * as React from 'react'

interface SwitchBaseStateProps {
  render: boolean
}

class SwitchBase extends React.Component<SwitchBaseStateProps> {
  render() {
    if (this.props.render) {
      return this.props.children
    }
    return null
  }
}

const isLoggedIn = (state: State): boolean => !!state.accessToken

export const LoggedInRender = connect({
  mapStateToProps: (state) => ({
    render: isLoggedIn(state),
  }),
})(SwitchBase)

export const LoggedOutRender = connect({
  mapStateToProps: (state) => ({
    render: !isLoggedIn(state),
  }),
})
