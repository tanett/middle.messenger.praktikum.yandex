
import SignUp from '../../modules/signUp/signUp';


const SignUpPage= () => {

    const  component = SignUp()

    return component
}

document.querySelector('#root').innerHTML = SignUpPage();

const formSignUp = document.querySelector('#signUpForm')

formSignUp.addEventListener('submit', (e)=>{e.preventDefault(); window.location.pathname = "/chatList.html"})

const linkBtn = document.querySelector('#linkToSignIn')

linkBtn.addEventListener('click', (e)=>{e.preventDefault(); window.location.pathname = "/signIn.html"})
