
import store from '../utils/Store'
import router from '../utils/Router'
import UserAPI, { editUserData, newPasswordData } from '../api/UserAPI'


class UserController {
  private readonly api: typeof UserAPI

  constructor() {
    this.api = UserAPI
  }

  async searchUser(login: string) {
    try {
      const response = await this.api.searchByLogin({ login : login})
      console.log(response)

    } catch (e: any) {
      console.error(e)
    }
  }

  async getUserById(id: string) {
    try {
      const response = await this.api.read(id)

      if (response.id) {
       console.log(response)
      }


    } catch (e: any) {
      console.error(e.message)
    }
  }

  async changeUserProfile(editData: editUserData ) {
    const response = await this.api.changeUserProfile(editData)


    if (response.id) {
      store.set('user', response)

    }
  }

  async changeUserPassword(passwordData: newPasswordData ) {
    const response = await this.api.changeUserPassword(passwordData)


    console.log(response)
  }
  async changeUserAvatar(avatar: FormData ) {
    const response = await this.api.changeUserAvatar(avatar)
    if (response.id) {
      store.set('user', response)

    }

    console.log(response)
  }

}

export default new UserController()
