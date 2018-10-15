// @flow

import * as React from 'react'
import {stringify} from 'qs'
import {environment} from '../../config/environment'

type LoginLinkProps = {
  className?: string,
  children?: React.Node,
}

const spotifyParams = stringify({
  client_id: environment.spotifyClientId,
  response_type: 'token',
  redirect_uri: 'http://localhost:3000/receive'
})

export const LoginLink = (props: LoginLinkProps) => (
  <a href={`https://accounts.spotify.com/authorize?${spotifyParams}`} className={props.className}>
    {props.children}
  </a>
)
