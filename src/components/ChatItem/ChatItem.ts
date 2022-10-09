import ChatItemTmpl from './ChatItem.hbs'
import './style.css'
import Block from '../../utils/Block'
import store, { withStore } from '../../utils/Store'
import { resourceUrl }from '../../api/constants'


interface IChatItem {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  activeChatId: string;
  active: boolean
  events: {
    click: () => void;
  }
}

export class ChatItemBase extends Block<IChatItem> {
  static componentName: string='ChatItemBase'

  constructor(props: IChatItem) {
    super('ChatItemBase', props)
  }



  render(): any {

    const chatAvatar = this.props.avatar
      ? `<img src='${resourceUrl}${ this.props.avatar }' alt='${ this.props.title }' class='chatItem__img'>`
      : null
    return this.compile(ChatItemTmpl, {
      ...this.props,
      avatar: chatAvatar,
      children: this.children,
    })
  }
}

export const withSelectedChat = withStore(state => ({activeChatId: (state.chats || []).find(({id}:any) => id === state.activeChatId)}));

export const ChatItem = withSelectedChat(ChatItemBase as unknown as typeof Block);
