// @flow

import * as React from 'react'
import type {RouterHistory, Location} from 'react-router-dom'
import {parse} from 'qs'
import {connect} from 'react-redux'

type ReceiveTokenOwnProps = {
  location: Location,
  history: RouterHistory,
}

type ReceiveTokenStateProps = {
  keep: (accessToken: string) => void,
}

type ReceiveTokenProps = ReceiveTokenOwnProps & ReceiveTokenStateProps

class ReceiveToken extends React.Component<ReceiveTokenProps> {
  componentDidMount() {
    const hashParams = this.props.location.hash.substring(1)
    this.props.keep(parse(hashParams).access_token)
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

export const ConnectedReceiveToken = connect<string>()(ReceiveToken)
