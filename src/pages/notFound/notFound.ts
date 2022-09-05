import { ErrorPageLayout } from '../../layouts/errorPageLayout/errorPageLayout'
// @ts-ignore
import components from './components/**/index.ts'

import { helperRegisterComponent } from '../../utils/helperRegisterComponent'
import { ErrorPage } from '../../components/ErrorPage/ErrorPage'

const notFound = new ErrorPage({
                                 title: '404',
                                 subTitle: 'Не туда попали',
                                 link: './chatList.html',
                                 linkText: 'Назад к чатам',
                               })

window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  Object.values(components).forEach((component) => helperRegisterComponent(component.default))
  const root = document.querySelector('#root')!

  const homePage = new ErrorPageLayout({ content: notFound })

  root.append(homePage.getContent()!)

  homePage.dispatchComponentDidMount()
})
