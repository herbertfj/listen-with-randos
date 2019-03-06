import { stringify } from "qs"
import * as React from "react"
import { environment } from "../../config/environment"

type LoginLinkProps = {
  className?: string
}

const spotifyParams = stringify({
  client_id: environment.spotifyClientId,
  redirect_uri: `${window.location.origin}/receive`,
  response_type: "token",
})

export const LoginLink: React.FC<LoginLinkProps> = props => (
  <a
    href={`https://accounts.spotify.com/authorize?${spotifyParams}`}
    className={props.className}
  >
    {props.children}
  </a>
)
