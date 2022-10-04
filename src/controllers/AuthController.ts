import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import store from '../utils/Store'
import router from '../utils/Router'

class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signin(data: SigninData) {
    try {
      const response = await this.api.signin(data)
      console.log(response)

      await this.fetchUser()

      router.go('/profile')


    } catch (e: any) {
      console.error(e)
    }
  }

  async signup(data: SignupData) {
    try {
      const response = await this.api.signup(data)
      // @ts-ignore
      if (response.id) {
        await this.fetchUser()
        router.go('/profile')
      }


    } catch (e: any) {
      console.error(e.message)
    }
  }

  async fetchUser() {
    const user = await this.api.read()


    if (user.id) {
      store.set('user', user)
      console.log(store)
    }
  }

  async logout() {
    try {
      await this.api.logout()

      router.go('/')
    } catch (e: any) {
      console.error(e.message)
    }
  }


}

export default new AuthController()
