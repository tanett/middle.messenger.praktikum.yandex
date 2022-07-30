import ChatItemTmpl from './ChatItem.hbs'
import './style.css'



export default function (id,text, chatName,avatar, date,count, classNames){

    const chatAvatar = avatar? `<img src=${avatar.src} alt=${chatName} class="chatItem__img">`:undefined

    return ChatItemTmpl ({id, text, chatName,chatAvatar, date , count, classNames})
}
