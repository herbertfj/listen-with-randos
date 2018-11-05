import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { ChatWindow } from "./ChatWindow"
import { Chat } from "../../domain/chats/chats"

describe("ChatWindow", () => {
  const chats: Chat[] = [
    {
      id: "1",
      userId: "userId1",
      message: "message",
      time: new Date(),
    },
  ]

  let sendChat: jest.Mock
  let wrapper: ReactWrapper

  beforeEach(() => {
    sendChat = jest.fn().mockName("sendChat")
    wrapper = mount(<ChatWindow chats={chats} sendChat={sendChat} />)
  })

  it("should display the chats", () => {
    const chats = wrapper.find("[data-chat]").map(chat => chat.text())

    expect(chats).toContain("userId1: message")
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
