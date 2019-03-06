import * as React from "react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  Chat,
  ChatMessage,
  loadChats,
  sendChat,
} from "../../domain/chats/chats"
import { AppAction, State } from "../../domain/root"
import { User } from "../../domain/user/user"

type ChatWindowStateProps = {
  chats: Chat[]
  user: User
}

type ChatWindowDispatchProps = {
  sendChat(chat: ChatMessage): void
  loadChats(): void
}

type ChatWindowProps = ChatWindowStateProps & ChatWindowDispatchProps

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chats,
  user,
  sendChat,
  loadChats,
}) => {
  useEffect(() => {
    loadChats()
  }, [])

  const [newChat, setNewChat] = useState("")

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewChat(event.target.value)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    sendChat({
      message: newChat,
      time: new Date(),
      userId: user.id,
    })

    setNewChat("")
  }

  return (
    <>
      <div>
        <h1>Chats</h1>
        {chats.map(chat => (
          <p key={chat.id} data-chat>
            {chat.user.displayName}: {chat.message}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit} data-form>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newChat}
            onChange={onInputChange}
            data-input
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
  user: state.user.userInfo!!,
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  loadChats() {
    dispatch(loadChats())
  },
  sendChat(chat: ChatMessage) {
    dispatch(sendChat(chat))
  },
})

export const ConnectedChatWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindow)
