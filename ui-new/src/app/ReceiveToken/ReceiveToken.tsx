import {parse} from 'qs'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {Dispatch} from 'redux'
import {KEEP_TOKEN} from '../../domain/accessToken/accessToken'
import {AppAction} from '../../domain/root'

type ReceiveTokenDispatchProps = {
  keep: (accessToken: string) => void,
}

type ReceiveTokenProps = RouteComponentProps & ReceiveTokenDispatchProps

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

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  keep(token: string) {
    dispatch({
      token,
      type: KEEP_TOKEN,
    })
  },
})

export const ConnectedReceiveToken = connect(
  null,
  mapDispatchToProps,
)(ReceiveToken)
