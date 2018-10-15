// @flow

import * as React from 'react'
import type {Location, RouterHistory} from 'react-router-dom'
import {parse} from 'qs'
import {connect} from 'react-redux'
import {KEEP_TOKEN} from '../../domain/store/actions/actions'
import type {Dispatch} from '../../domain/store/actions/actions'

type ReceiveTokenOwnProps = {
  location: Location,
  history: RouterHistory,
}

type ReceiveTokenDispatchProps = {
  keep: (accessToken: string) => void,
}

type ReceiveTokenProps = ReceiveTokenOwnProps & ReceiveTokenDispatchProps

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  keep(token) {
    dispatch({
      type: KEEP_TOKEN,
      token,
    })
  },
})

export const ConnectedReceiveToken = connect(
  null,
  mapDispatchToProps,
)(ReceiveToken)
