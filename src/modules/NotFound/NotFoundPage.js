
import './style.css'
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import NotFoundTmpl from './NotFoundPage.hbs'




export default function NotFoundPage() {




    return NotFoundTmpl({error: ErrorPage(
             '404',
             'Не туда попали',
            './chatList.html',
             'Назад к чатам'

        )})
}


