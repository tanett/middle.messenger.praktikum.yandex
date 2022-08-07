
import './style.css'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import ServerErrorTmpl from '../../modules/ServerError/ServerError500Page.hbs'




export default function ServerError500Page() {


    return ServerErrorTmpl({error: ErrorPage(
             '500',
             'Мы уже фиксим',
            './chatList.html',
             'Назад к чатам'

        )})
}


