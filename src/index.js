
// import SignIn from './pages/signIn/signIn.js';
import DefaultComponentsTmpl from './components/defaultComponents/defaultComponents.hbs';
// import SignUp from './pages/signUp/signUp';
// import Profile from './pages/profile/Profile';
import NotFoundPage from './modules/NotFound/NotFoundPage';
import ServerError500 from './modules/ServerError/ServerError500Page';
// import ChatList from './pages/chatList/ChatList';

const App = () => {

    // Handlebars.registerHelper('stringifyFunc', function(fn) {
    //     return new Handlebars.SafeString("(" +
    //         fn.toString().replace(/\"/g,"\'") + ")()");
    // });

    let component

    switch (window.location.pathname) {
        // case '/signIn':{
        //     component = SignIn()
        //     break
        // }
        // case '/signUp':{
        //     component = SignUp()
        //     break
        // }
        // case '/chatList':{
        //     component = ChatList()
        //     break
        // }
        // case '/profile':{
        //     component = Profile()
        //     break
        // }
        case '/notFound':{
            component = NotFoundPage()
            break
        }
        case '/error':{
            component = ServerError500()
            break
        }
        default: {
            component = (()=>DefaultComponentsTmpl())()
        }
    }

    return component
}

document.querySelector('#root').innerHTML = App();

