import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { ChatWindow } from "./ChatWindow"
import { Chat } from "../../domain/chats/chats"
import { User } from "../../domain/user/user"

describe("ChatWindow", () => {
  const chats: Chat[] = [
    {
      id: "1",
      message: "message",
      time: new Date(),
      user: {
        id: "userId",
        displayName: "displayName",
      },
    },
  ]

  const user: User = {
    id: "userId",
    displayName: "displayName",
    spotifyId: "spotifyId",
  }

  let loadChats: jest.Mock
  let sendChat: jest.Mock
  let wrapper: ReactWrapper

  beforeEach(() => {
    loadChats = jest.fn().mockName("loadChats")
    sendChat = jest.fn().mockName("sendChat")
    wrapper = mount(
      <ChatWindow
        chats={chats}
        user={user}
        loadChats={loadChats}
        sendChat={sendChat}
      />
    )
  })

  it("should display the chats", () => {
    const chats = wrapper.find("[data-chat]").map(chat => chat.text())

    expect(chats).toContain("displayName: message")
  })

  describe("when it mounts", () => {
    beforeEach(() => {
      wrapper.mount()
    })

    it("should load the chats", () => {
      expect(loadChats).toHaveBeenCalled()
    })

    describe("and mounts again", () => {
      beforeEach(() => {
        wrapper.mount()
      })

      it("shouldn't reload the chats", () => {
        expect(loadChats).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("when a message is entered", () => {
    beforeEach(() => {
      wrapper
        .find("[data-input]")
        .simulate("change", { target: { value: "new message" } })
      wrapper.find("[data-form]").simulate("submit")
    })

    it("should send the chat", () => {
      expect(sendChat).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "new message",
        })
      )
    })
  })
})
