package listenwithrandos.app

import kotlinx.html.ButtonType.submit
import kotlinx.html.InputType.text
import kotlinx.html.js.onChangeFunction
import kotlinx.html.js.onSubmitFunction
import listenwithrandos.domain.chats.Chat
import listenwithrandos.domain.chats.getChats
import listenwithrandos.domain.chats.sendChat
import listenwithrandos.state.AppAction
import listenwithrandos.state.SetChats
import listenwithrandos.state.State
import org.w3c.dom.HTMLInputElement
import react.*
import react.dom.*
import react.redux.rConnect
import redux.WrapperAction
import kotlin.js.Date

interface ChatWindowStateProps : RProps {
    var chats: List<Chat>
}

interface ChatWindowDispatchProps : RProps {
    var submitChat: (String) -> Unit
}

interface ChatWindowProps : ChatWindowStateProps, ChatWindowDispatchProps

interface ChatWindowState : RState {
    var newChat: String
}

class ChatWindow : RComponent<ChatWindowProps, ChatWindowState>() {
    override fun ChatWindowState.init() {
        newChat = ""
    }

    override fun RBuilder.render() {
        div {
            h1 { +"Chats" }

            props.chats.forEach { chat ->
                p { +"Me: ${chat.message}" }
            }
        }

        form {
            attrs.onSubmitFunction = { event ->
                event.preventDefault()

                props.submitChat(state.newChat)

                setState {
                    newChat = ""
                }
            }

            div(classes = "input-group") {
                input(type = text, classes = "form-control") {
                    attrs.value = state.newChat
                    attrs.onChangeFunction = { event ->
                        val target = event.target as HTMLInputElement

                        setState {
                            newChat = target.value
                        }
                    }
                }

                div(classes = "input-group-append") {
                    button(type = submit, classes = "btn btn-primary") {
                        +"Send"
                    }
                }
            }
        }
    }
}

fun sendAndGetChats(message: String, dispatch: (AppAction) -> WrapperAction) {
    sendChat(Chat(userId = "me", message = message, time = Date()))
        .then { getChats() }
        .then { dispatch(SetChats(it)) }
}

val connectedChatWindow = rConnect<State, AppAction, WrapperAction, RProps, ChatWindowStateProps, ChatWindowDispatchProps, ChatWindowProps>(
    mapStateToProps = { state, _ ->
        chats = state.chats
    },
    mapDispatchToProps = { dispatch, _ ->
        submitChat = { sendAndGetChats(it, dispatch) }
    }
)(ChatWindow::class.js.unsafeCast<RClass<RProps>>())
