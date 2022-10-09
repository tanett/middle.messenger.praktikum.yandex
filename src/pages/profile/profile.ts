import { Profile } from '../../modules/Profile/Profile'

// @ts-ignore
import components from '../../components/**/index.ts'

// @ts-ignore
import modules from '../../modules/**/index'

import { helperRegisterComponent } from '../../utils/helperRegisterComponent'

window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  Object.values(components).forEach((component) => helperRegisterComponent(component.default))

  // @ts-ignore
  Object.values(modules).forEach((module) => helperRegisterComponent(module.default))
  const root = document.querySelector('#root')!

  const ProfilePage = new Profile({
                                    name: 'Иван',
                                    secondName: 'Ivanov',
                                    displayName: 'vanya',
                                    email: 'pochta@yandex.ru',
                                    login: 'Ivan',
                                    phone: '+79659959598',
                                    password: '1111',
                                    editMode: 'main',
                                    errorDisplayNameMessage: '',
                                    errorEmailMessage: '',
                                    errorFirstNameMessage: '',
                                    errorLoginMessage: '',
                                    errorNewPasswordMessage: '',
                                    errorOldPasswordMessage: '',
                                    errorPhoneMessage: 'Длина 9-15 символов, только цмфры, может начинаться с +',
                                    errorSecondNameMessage: '',
                                    errorSubmitPasswordMessage: '',
                                  })

  root.append(ProfilePage.getContent()!)

  ProfilePage.dispatchComponentDidMount()
})
