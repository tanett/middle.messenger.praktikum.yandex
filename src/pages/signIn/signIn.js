
import SignIn from '../../modules/signIn/signIn';


const SignInPage= () => {

    const  component = SignIn()


    return component
}

document.querySelector('#root').innerHTML = SignInPage();

const formSignIn = document.querySelector('#signInForm')

formSignIn.addEventListener('submit', (e)=>{e.preventDefault(); window.location.pathname = "/chatList.html"})

const linkBtn = document.querySelector('#linkToSignUp')

linkBtn.addEventListener('click', (e)=>{e.preventDefault(); window.location.pathname = "/signUp.html"})
