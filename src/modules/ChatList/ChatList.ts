import './style.css'
import ChatListTmpl from './ChatList.hbs'
import { Message } from '../../components/Message/Message'
import Block from '../../utils/Block'
import { IChats } from '../../api/ChatsAPI'
import ChatsController from '../../controllers/ChatsController'
import ChatItem from '../../components/ChatItem'
import { ILightUser } from '../../api/UserAPI'
import store, { withStore } from '../../utils/Store'


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
  id: string,
  author: string,
  text: string,
  image: string | null,
  checkRead: boolean,
  date: string,
}

interface IChatList {
  openPopupCreateChat: boolean
  chats: IChats[]
}

class ChatList extends Block<IChatList> {
  messageValue: string = ''
  chatsList: IChats[] = []

  constructor(props: IChatList) {
    super('ChatList', props)
    ChatsController.getChats().then((res) => {if (res) {this.dispatchComponentDidUpdate()}})


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
  }

  onAddInMessageClick(e: Event) {
    console.log('add in message btn')
  }

//----------------------------------------------------------------------------------------------------------------------


  // messages
  // messages: typeMessageItem[] = [
  //   {
  //     id: '1',
  //     author: 'Вася',
  //     text:
  //       'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью ServerError EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
  //       '\n' +
  //       'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  //     image: null,
  //     checkRead: false,
  //     date: '15:58',
  //   },
  //   {
  //     id: '2',
  //     author: 'Вася',
  //     text: '',
  //     image: '../../image/photo.png',
  //     checkRead: false,
  //     date: '15:58',
  //   },
  //   {
  //     id: '3',
  //     author: 'you',
  //     text: 'Круто!  ',
  //     image: null,
  //     checkRead: true,
  //     date: '15:59',
  //   },
  // ]

//----------------------------------------------------------------------------------------------------------------------
  onChatClick = (e: Event) => {

    // @ts-ignore
    const chatId =  e.target!.id
    console.log("chatID", chatId, e.target)

    this.chatsList.find((chat: IChats) => chatId === chat.id)!.active = true

    this.dispatchComponentDidUpdate()

  }
  // messagesList = this.chatList.find(chat=> chat.active === true).messages
  //   .map((item) => {
  //     let className =
  //       item.author === 'you'
  //         ? 'messagesItem__host'
  //         : 'messagesItem__interlocutor'
  //
  //     if (item.image) {
  //       className = `${ className } messagesItem_image`
  //     }
  //
  //     return new Message({
  //                          id: item.id,
  //                          text: item.text,
  //                          // @ts-ignore
  //                          image: item.image,
  //                          date: item.date,
  //                          checkRead: item.checkRead,
  //                          classNames: className,
  //                        })
  //   })
  //   .join('')
//----------------------------------------------------------------------------------------------------------------------
  onAddChatClick = () => {

    this.setProps({ openPopupCreateChat: true })
    console.log('+', this.props.openPopupCreateChat)
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
    // const st = this.props.chats.map(item=>({...item, onChatClick: (e:Event)=> this.onChatClick(e)}))
    // console.log('lll', st, this.props.chats, this.onChatClick)

    return this.compile(ChatListTmpl, {
      chatName: 'Вася',
      chatListContent: this.props.chats,
      children: this.children,
      onChangeMessage: this.onChangeMessage.bind(this),
      onSubmitMessageClick: this.onSubmitMessageClick.bind(this),
      onAddInMessageClick: this.onAddInMessageClick.bind(this),
      onAddChatClick: (e: Event) => this.onAddChatClick(),
      openPopupCreateChat: (e: Event) => this.openPopupCreateChatHandler(e),
      closePopupCreateChat: (e: Event) => this.closePopupCreateChatHandler(e),
      isOpenPopup: this.props.openPopupCreateChat,
      onSaveNewChat: ( (e: Event) => this.onSaveNewChat(e) ).bind(this),
      onChatClick:((e:Event)=> console.log('888888')).bind(this),

    })
  }

}

const withChats = withStore((state) => ( { chats: state.chatsList } ))

// @ts-ignore
export const Chats = withChats(ChatList)
