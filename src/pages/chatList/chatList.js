
import ChatList from '../../modules/ChatList/ChatList';


const ChatListPage = () => {

    const  component = ChatList()

    return component
}

document.querySelector('#root').innerHTML = ChatListPage();

