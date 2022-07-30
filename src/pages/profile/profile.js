
import Profile from '../../modules/Profile/Profile';


const ProfilePage = () => {

    const  component = Profile()

    return component
}

document.querySelector('#root').innerHTML = ProfilePage();

const outBtn = document.querySelector('#out')

outBtn.addEventListener('click', ()=>{window.location.pathname='/signIn.html'})
