import { ChatList } from '../../modules/ChatList/ChatList'
// @ts-ignore
import components from '../../components/**/index.ts'
// @ts-ignore
import modules from '../../modules/**/index.ts'

import { helperRegisterComponent } from '../../utils/helperRegisterComponent'

window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  Object.values(components).forEach((component) => helperRegisterComponent(component.default))

  // @ts-ignore
  Object.values(modules).forEach((module) => helperRegisterComponent(module.default))
  const root = document.querySelector('#root')!

  const ChatListPage = new ChatList({})

  root.append(ChatListPage.getContent()!)

  ChatListPage.dispatchComponentDidMount()
})
