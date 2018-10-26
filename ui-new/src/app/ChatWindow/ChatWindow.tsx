import * as React from 'react'
import {SyntheticEvent} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {Chat, sendChat} from '../../domain/chats/chats'
import {AppAction, State} from '../../domain/root'

type ChatWindowStateProps = {
  chats: Chat[]
}

type ChatWindowDispatchProps = {
  sendChat(chat: Chat): void
}

type ChatWindowProps = ChatWindowStateProps & ChatWindowDispatchProps

type ChatWindowState = {
  newChat: string
}

class ChatWindow extends React.PureComponent<ChatWindowProps, ChatWindowState> {
  constructor(props: ChatWindowProps) {
    super(props)

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
      message: this.state.newChat,
      time: new Date(),
      userId: 'user',
    })

    this.setState({newChat: ''})
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

const mapStateToProps = (state: State) => ({
  chats: state.chats,
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  sendChat(chat: Chat) {
    dispatch(sendChat(chat))
  },
})

export const ConnectedChatWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatWindow)
