import * as React from "react"
import { State } from "../../domain/root"
import { connect } from "react-redux"

type DisplayNameStateProps = {
  displayName: string | null
}

const DisplayNameComponent: React.FC<DisplayNameStateProps> = props => (
  <span>{props.displayName}</span>
)

const mapStateToProps = (state: State) => ({
  displayName: state.user.userInfo && state.user.userInfo.displayName,
})

export const DisplayName = connect(mapStateToProps)(DisplayNameComponent)
