import * as React from "react"
import { ChangeEvent, FormEvent, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Chat, sendChat } from "../../domain/chats/chats"
import { AppAction, State } from "../../domain/root"

type ChatWindowStateProps = {
  chats: Chat[]
}

type ChatWindowDispatchProps = {
  sendChat(chat: Chat): void
}

type ChatWindowProps = ChatWindowStateProps & ChatWindowDispatchProps

export const ChatWindow: React.SFC<ChatWindowProps> = ({ chats, sendChat }) => {
  const [newChat, setNewChat] = useState("")

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewChat(event.currentTarget.value)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    sendChat({
      message: newChat,
      time: new Date(),
      userId: "user",
    })

    setNewChat("")
  }

  return (
    <>
      <div>
        <h1>Chats</h1>
        {chats.map(chat => (
          <p key={chat.id}>
            {chat.userId}: {chat.message}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newChat}
            onChange={onInputChange}
          />

          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  )
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
  mapDispatchToProps
)(ChatWindow)
