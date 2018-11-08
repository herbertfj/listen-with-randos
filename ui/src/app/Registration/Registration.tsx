import * as React from "react"
import { ChangeEvent, FormEvent, useState } from "react"
import { RouteComponentProps, StaticContext } from "react-router"
import { User } from "../../domain/user/user"

type RegistrationProps = RouteComponentProps<{}, StaticContext, User>

export const Registration: React.SFC<RegistrationProps> = props => {
  const user = props.location.state
  const [displayName, setDisplayName] = useState(user.displayName)

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setDisplayName(event.target.value)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
