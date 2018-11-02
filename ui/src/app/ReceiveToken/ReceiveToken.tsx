import * as React from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"
import { Dispatch } from "redux"
import { keepToken } from "../../domain/accessToken/accessToken"
import { AppAction } from "../../domain/root"
import { parse } from "qs"

type ReceiveTokenDispatchProps = {
  keepToken: (accessToken: string) => void
}

type ReceiveTokenProps = RouteComponentProps & ReceiveTokenDispatchProps

const ReceiveToken: React.SFC<ReceiveTokenProps> = props => {
  useEffect(() => {
    const hashParams = props.location.hash.substring(1)
    props.keepToken(parse(hashParams).access_token)
    props.history.push("/")
  })

  return null
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  keepToken(token: string) {
    dispatch(keepToken(token))
  },
})

export const ConnectedReceiveToken = connect(
  null,
  mapDispatchToProps
)(ReceiveToken)
