
import ChatItemTmpl from './ChatItem.hbs'
import './style.css'
import Block from '../../utils/Block';


interface IChatItem {
    id:string ,text: string, chatName: string, avatar: {src: string} | null, date: string,count: number, classNames: string
}

export class ChatItem extends Block {
    constructor(props: IChatItem) {
        super('ChatItem', props);
        this.props = props
    }
    render(): any {
        const chatAvatar = this.props.avatar ? `<img src=${this.props.avatar.src} alt=${this.props.chatName} class="chatItem__img">`:undefined
        return this.compile(ChatItemTmpl, {
            ...this.props, avatar: chatAvatar,
            children: this.children,
        })
    }

}
