
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
//   // @ts-ignore
//   Object.values(components).forEach((component) => helperRegisterComponent(component.default))
//   console.log("++++++", components, modules)
// // @ts-ignore
//   Object.values(modules).forEach((module) => helperRegisterComponent(module.default))
  // // @ts-ignore
  // Object.values(components).forEach((component) => helperRegisterComponent(component.default))
  // const root = document.querySelector('#root')!
  //
  // const homePage = new IndexLayout({ title: 'Page list' })
  //
  // root.append(homePage.getContent()!)
  //
  // homePage.dispatchComponentDidMount()
  // @ts-ignore

  Router
    .use(ROUTES.Home, SignIn)
    .use(ROUTES.Signup, SignUp)
    // @ts-ignore
    .use(ROUTES.Profile, Profile)
    // @ts-ignore
    .use(ROUTES.Chats, ChatList)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTES.Home:
    case ROUTES.Signup:
      isProtectedRoute = false;
      break;
  }

  try {

    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(ROUTES.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(ROUTES.Home);
    }
  }
})
