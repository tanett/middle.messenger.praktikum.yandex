
// @ts-ignore
import components from './components/**/index.ts'
// @ts-ignore
import modules from './modules/**/index.ts'

import { helperRegisterComponent } from './utils/helperRegisterComponent'
import Router from './utils/Router'
import { SignUp } from './modules/signUp/SignUp'
import { SignIn } from './modules/signIn/SignIn'
import { Profile } from './modules/Profile/Profile'
import AuthController from './controllers/AuthController'
import ChatList from './modules/ChatList'
import { Chats } from './modules/ChatList/ChatList'


export enum ROUTES {
  Home = '/',
  Signup = '/signup',
  Profile = '/profile',
  Chats = '/chats'
}



window.addEventListener('DOMContentLoaded', async () => {

  // @ts-ignore
  Object.values(components).forEach((component) => helperRegisterComponent(component.default))

  // @ts-ignore
  Object.values(modules).forEach((module) => helperRegisterComponent(module.default))


  Router
    // @ts-ignore
    .use(ROUTES.Home, SignIn)
    // @ts-ignore
    .use(ROUTES.Signup, SignUp)
    // @ts-ignore
    .use(ROUTES.Profile, Profile)
    // @ts-ignore
    .use(ROUTES.Chats, Chats)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTES.Home:
    case ROUTES.Profile:
    case ROUTES.Chats:
    case ROUTES.Signup:
      isProtectedRoute = false;
      break;
  }

  try {

    await AuthController.fetchUser();

    Router.start();

    // if (!isProtectedRoute) {
    //   Router.go(ROUTES.Profile)
    // }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(ROUTES.Home);
    }
  }
})
