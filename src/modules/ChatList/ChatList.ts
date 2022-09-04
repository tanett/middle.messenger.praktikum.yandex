import './style.css'

import ChatListTmpl from './ChatList.hbs'

import { Message }from '../../components/Message/Message';

import { ChatItem } from '../../components/ChatItem/ChatItem';
import Block from '../../utils/Block';



export type typeChatItem = {
    id:string,
    text: string | null,
    chatName: string,
    avatar:{src: string}| null,
    date: string,
    count: number,
    classNames: string
}

export type typeMessageItem = {
    id: string,
    author: string,
    text: string,
    image: string | null,
    checkRead: boolean,
    date: string
}

interface IChatList {

}

export class ChatList extends Block{
    messageValue: string="";
    constructor(props: IChatList) {
        super('ChatList', props);
        this.props = props

    }

    //inputMessage
    onChangeMessage(e:Event){
        // @ts-ignore
        this.messageValue = e.target?.value
    }

    onSubmitMessageClick(e:Event){
        e.preventDefault()
        console.log({message: this.messageValue})
    }
    onAddInMessageClick(e:Event){
        console.log("add in message btn")
    }

    //chats
   chats: typeChatItem[] = [{id:'11',text: '554 555', chatName: 'GHJG',avatar:null ,date: 'sun',count: 0 , classNames:''},
        {id:'22',text: '555555', chatName: 'yyyy',avatar:null, date: 'mun',count: 5 , classNames:''},
    ]


// messages
messages: typeMessageItem[] = [
        {
            id: '1',
            author: 'Вася',
            text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью ServerError EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n" +
                "\n" +
                "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            image: null,
            checkRead: false,
            date: '15:58'
        },
        {
            id: '2',
            author: 'Вася',
            text: '',
            image: '../../image/photo.png',
            checkRead: false,
            date: '15:58'
        },
        {
            id: '3',
            author: 'you',
            text: 'Круто!  ',
            image: null,
            checkRead: true,
            date: '15:59'
        },
    ]
messagesList = this.messages.map((item) => {

       let className = item.author === 'you' ? 'messagesItem__host' : 'messagesItem__interlocutor'

        if(item.image){className = `${className} messagesItem_image`}


    return new Message({
                           id:item.id,
                           text: item.text,
                           // @ts-ignore
                           image: item.image,
                           date: item.date,
                           checkRead:item.checkRead,
                           classNames:className})
    }).join('')


    render(): any {
        return this.compile(ChatListTmpl, {
            chatName: 'Вася',
            children: this.children,
            onChangeMessage: this.onChangeMessage.bind(this),
            onSubmitMessageClick: this.onSubmitMessageClick.bind(this),
            onAddInMessageClick: this.onAddInMessageClick.bind(this)
        })
    }
}
