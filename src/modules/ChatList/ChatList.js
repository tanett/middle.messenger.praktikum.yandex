import './style.css'
import ChatListTmpl from './ChatList.hbs'
import Message from '../../components/Message/Message';
import ChatItem from '../../components/ChatItem/ChatItem';


export default function ChatList() {

    //chats

    const chats = [{id:'11',text: '554 555', chatName: 'GHJG',avatar:undefined, date: 'sun',count: 0 , classNames:''},
        {id:'22',text: '555555', chatName: 'yyyy',avatar:undefined, date: 'mun',count: 5 , classNames:''},
    ]

    const chatsList = chats.map((item)=>{

        return ChatItem(item.id,item.text,item.chatName,item.avatar,item.date, item.count ===0? false: item.count, item.classNames)
    }).join('')

// messages
    const messages = [
        {
            id: '1',
            author: 'Вася',
            text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью ServerError EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n" +
                "\n" +
                "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            image: false,
            checkRead: false,
            date: '15:58'
        },
        {
            id: '2',
            author: 'Вася',
            text: false,
            image: '../../image/photo.png',
            checkRead: false,
            date: '15:58'
        },
        {
            id: '3',
            author: 'you',
            text: 'Круто!  ',
            image: false,
            checkRead: true,
            date: '15:59'
        },
    ]
    const messagesList = messages.map((item) => {

       let className = item.author === 'you' ? 'messagesItem__host' : 'messagesItem__interlocutor'

        if(item.image){className = `${className} messagesItem_image`}

        return Message(item.id, item.text, item.image, item.date,item.checkRead, className,)
    }).join('')


    return ChatListTmpl({
        chatsList: chatsList,
        messagesList: messagesList,
        chatName: 'Вася'
    })
}
