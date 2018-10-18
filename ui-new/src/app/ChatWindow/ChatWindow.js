// @flow

import * as React from 'react'
import {connect} from 'react-redux'
import type {State} from '../../domain/store/reducer/reducer'
import {SEND_CHAT} from '../../domain/store/actions/actions'
import type {AppAction, Chat} from '../../domain/store/actions/actions'
import type {Dispatch} from 'redux'

type ChatWindowStateProps = {
  chats: Array<Chat>
}

type ChatWindowDispatchProps = {
  sendChat(chat: Chat): void
}

type ChatWindowProps = ChatWindowStateProps & ChatWindowDispatchProps

type ChatWindowState = {
  newChat: string
}

class ChatWindow extends React.PureComponent<ChatWindowProps, ChatWindowState> {
  constructor() {
    super()

    this.state = {
      newChat: '',
    }
  }

  onInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      newChat: event.currentTarget.value,
    })
  }

  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.props.sendChat({
      userId: 'user',
      message: this.state.newChat,
      time: new Date(),
    })

    this.setState({newChat: ''})
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Chats</h1>
          {
            this.props.chats.map(chat => (
              <p key={chat.id}>{chat.userId}: {chat.message}</p>
            ))
          }
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <input type="text"
                   className="form-control"
                   value={this.state.newChat}
                   onChange={this.onInputChange}
            />

            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  chats: state.chats,
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  sendChat(chat) {
    dispatch({
      type: SEND_CHAT,
      chat,
    })
  },
})

export const ConnectedChatWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatWindow)
