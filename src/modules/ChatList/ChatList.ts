import './style.css'
import ChatListTmpl from './ChatList.hbs'
import { Message } from '../../components/Message/Message'
import Block from '../../utils/Block'
import { IChats } from '../../api/ChatsAPI'
import ChatsController from '../../controllers/ChatsController'
import ChatItem from '../../components/ChatItem'
import { ILightUser } from '../../api/UserAPI'
import store, { withStore } from '../../utils/Store'
import MessageController from '../../controllers/MessageController'
import { IResources } from '../../controllers/ResourcesController'
import { User } from '../../api/AuthAPI'


export type typeChatItem = {
  id: string,
  text: string | null,
  chatName: string,
  avatar: { src: string } | null,
  date: string,
  count: number,
  classNames: string,
  active: boolean
}

export type typeMessageItem = {

  id: number,
  user_id: number,
  type: 'message' | 'file',
  content: string,
  chat_id: number
  time: string,
  file?: IResources
}

interface IChatList {
  openPopupCreateChat: boolean
  openPopupAddUserInChat: boolean
  openPopupDeleteUserFromChat: boolean
  chats: IChats[]

  user: User
  messages: typeMessageItem[]
  isLoaded: boolean;
  activeChatId: number
}

class ChatList extends Block<IChatList> {
  messageValue: string = ''
  chatsList: IChats[] = []

  constructor(props: IChatList) {
    super('ChatList', props)
    ChatsController.getChats().then((res) => {if (res) {this.dispatchComponentDidUpdate()}})


  }

//----------------------------------------------------------------------------------------------------------------------
  protected init() {

    // @ts-ignore
    this.children.chats = this.createChats(this.props)
    // @ts-ignore
    this.children.messages = this.createMessagesList(this.props)
  }

//----------------------------------------------------------------------------------------------------------------------
  protected componentDidUpdate(oldProps: IChatList, newProps: IChatList): boolean {

    // @ts-ignore
    this.children.chats = this.createChats(newProps)
    // @ts-ignore
    this.children.messages = this.createMessagesList(newProps)
    return true
  }

//----------------------------------------------------------------------------------------------------------------------
  private createChats(props: IChatList) {
    return props.chats.map(data => {
      let date = ''
      if (data.last_message) {
        const d = new Date(data.last_message.time)
        const day = d.getDate() > 9 ? d.getDate() : `0${ d.getDate() }`
        const month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${ d.getMonth() + 1 }`
        date = `${ day }.${ month } ${ d.getHours() }:${ d.getMinutes() }`
      }

      return new ChatItem({
                            ...data,
                            id: data.id,
                            text: data.last_message?.content,

                            date: date,
                            count: data.unread_count,

                            active: this.props.activeChatId === data.id,
                            events: {
                              click: () => {
                                if(data.id === this.props.activeChatId){return}
                                ChatsController.selectChat(data.id)
                                MessageController.fetchOldMessages(data.id)
                                console.log('Click')
                              },
                            },
                          })
    })
  }

//----------------------------------------------------------------------------------------------------------------------
  private createMessagesList(props: IChatList) {
    return props.messages.map(data => {

      return new Message({
                           ...data,
                           id: data.id,
                           text: data.content,

                           date: data?.time.substring(11, 16) || '',
                           checkRead: true,
                           classNames: data.user_id === this.props.user.id ? 'messagesItem__host' : 'messagesItem__interlocutor',


                         })
    })
  }

//----------------------------------------------------------------------------------------------------------------------
  //inputMessage
  onChangeMessage(e: Event) {
    this.messageValue = ( e.target as HTMLInputElement ).value
  }

//----------------------------------------------------------------------------------------------------------------------
  onSubmitMessageClick(e: Event) {
    e.preventDefault()
    console.log({ message: this.messageValue })
    MessageController.sendMessage(this.props.activeChatId, this.messageValue)
  }

  onAddInMessageClick(e: Event) {
    console.log('add in message btn')
  }


//----------------------------------------------------------------------------------------------------------------------
  onChatClick = (e: Event) => {

    // @ts-ignore
    const chatId = e.target!.id
    if(chatId === this.props.activeChatId){return}
    store.set('activeChatId ', chatId)
    this.chatsList.find((chat: IChats) => chatId === chat.id)!.active = true

    this.dispatchComponentDidUpdate()

  }

//----------------------------------------------------------------------------------------------------------------------

  onAddChatClick = () => {
    this.setProps({ openPopupCreateChat: true })
  }

//----------------------------------------------------------------------------------------------------------------------

  onAddUserInChatHandler = (e: Event) => {
    this.setProps({ openPopupAddUserInChat: true })

  }

  onCloseUserInChatHandler = (e: Event) => {
    this.setProps({ openPopupAddUserInChat: false })
  }
  onSaveAddUserInChat = (e: Event) => {
    this.dispatchComponentDidUpdate()
  }

//----------------------------------------------------------------------------------------------------------------------

  onDeleteUserFromChatHandler = (e: Event) => {
    this.setProps({ openPopupDeleteUserFromChat: true })

  }

  onCloseUserFromChatHandler = (e: Event) => {
    this.setProps({ openPopupDeleteUserFromChat: false })
  }
  onSaveDeleteUserFromChat = (e: Event) => {
    this.dispatchComponentDidUpdate()
  }
//----------------------------------------------------------------------------------------------------------------------
  openPopupCreateChatHandler = (e: Event) => {
    this.setProps({ openPopupCreateChat: true })
  }


  closePopupCreateChatHandler = (e: Event) => {
    this.setProps({ openPopupCreateChat: false })
  }

  onSaveNewChat = (e: Event) => {
    this.dispatchComponentDidUpdate()
  }


//----------------------------------------------------------------------------------------------------------------------

  render(): any {

    return this.compile(ChatListTmpl, {
      chatName: this.props.activeChatId ? this.props.chats.find(item => item.id === this.props.activeChatId)?.title : '',
activeChat: !!this.props.activeChatId,
      children: this.children,
      onChangeMessage: this.onChangeMessage.bind(this),
      onSubmitMessageClick: this.onSubmitMessageClick.bind(this),
      onAddInMessageClick: this.onAddInMessageClick.bind(this),
      onAddChatClick: (e: Event) => this.onAddChatClick(),
      openPopupCreateChat: (e: Event) => this.openPopupCreateChatHandler(e),
      closePopupCreateChat: (e: Event) => this.closePopupCreateChatHandler(e),
      isOpenPopup: this.props.openPopupCreateChat,
      onSaveNewChat: ( (e: Event) => this.onSaveNewChat(e) ).bind(this),
      isOpenPopupAddUser: this.props.openPopupAddUserInChat,
      onAddUserHandler: (e: Event) => this.onSaveAddUserInChat(e),
      openPopupAddUserToChat: (e: Event) => this.onAddUserInChatHandler(e),
      closePopupAddUserToChat: (e: Event) => this.onCloseUserInChatHandler(e),
      isOpenPopupDeleteUser: this.props.openPopupDeleteUserFromChat,
      onDeleteUserHandler: (e: Event) => this.onSaveDeleteUserFromChat(e),
      openPopupDeleteUserFromChat: (e: Event) => this.onDeleteUserFromChatHandler(e),
      closePopupDeleteUserFromChat: (e: Event) => this.onCloseUserFromChatHandler(e),
    })
  }

}

const withChats = withStore((state) => ( {
  chats: [ ...state.chatsList || [] ],
  activeChatId: state.activeChatId,
  messages: ( state.messages || {} )[state.activeChatId] || [],
  user: state.user,
} ))

// @ts-ignore
export const Chats = withChats(ChatList)
