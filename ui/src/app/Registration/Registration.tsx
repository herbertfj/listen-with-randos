import * as React from "react"
import { ChangeEvent, FormEvent, useState } from "react"
import { RouteComponentProps, StaticContext } from "react-router"
import { register, User } from "../../domain/user/user"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AppAction } from "../../domain/root"

type RegistrationDispatchProps = {
  register(user: Partial<User>): void
}

type RegistrationProps = RouteComponentProps<{}, StaticContext, User> &
  RegistrationDispatchProps

const Registration: React.FC<RegistrationProps> = props => {
  const user = props.location.state
  const [displayName, setDisplayName] = useState(user.displayName)

  if (!props.location.state || !props.location.state.spotifyId) {
    props.history.replace("/")
    return null
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setDisplayName(event.target.value)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    props.register({
      displayName,
      spotifyId: user.spotifyId,
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="display-name">Display name</label>
        <input
          type="text"
          className="form-control"
          id="display-name"
          value={displayName}
          onChange={onInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  register(user: Partial<User>) {
    dispatch(register(user))
  },
})

export const ConnectedRegistration = connect(
  null,
  mapDispatchToProps
)(Registration)
