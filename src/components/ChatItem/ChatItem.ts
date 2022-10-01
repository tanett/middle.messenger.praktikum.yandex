import ChatItemTmpl from './ChatItem.hbs'
import './style.css'
import Block from '../../utils/Block'
import store from '../../utils/Store'
import { IChats } from '../../api/ChatsAPI'

interface IChatItem {
  id: number;
  text: string;
  chatName: string;
  avatar:  string | null;
  date: string;
  count: number;
  classNames: string;
  onClick: (e:Event)=>void
  active: boolean
}

export class ChatItem extends Block<IChatItem> {
  static componentName: string='ChatItem'

  constructor(props: IChatItem) {
    super('ChatItem', {
      id: props.id,
      text: props.text,
      active: props.active,
      chatName: props.chatName,
      avatar:  props.avatar,
      date: props.date,
      count: props.count,
      classNames: props.classNames,
      events: { click: (e:Event)=>{
        const chats = store.getState().chatsList
          chats.forEach((item:IChats)=>{
            if(item.id ===props.id){
              item.active = true
            } else {item.active=false}
          })

            store.set('chatList', chats)
            console.log('///////')

        }},
    })
    console.log('+++++++',this, props.onClick)
  }



  render(): any {
    const chatAvatar = this.props.avatar
      ? `<img src='${ this.props.avatar }' alt='${ this.props.chatName }' class='chatItem__img'>`
      : undefined
    return this.compile(ChatItemTmpl, {
      ...this.props,
      avatar: chatAvatar,
      children: this.children,
      onClick: (e:Event)=>console.log("99999")
    })
  }
}
