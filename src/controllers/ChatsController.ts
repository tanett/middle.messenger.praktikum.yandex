import store from '../utils/Store'
import ChatsAPI from '../api/ChatsAPI'
import MessageController from './MessageController'


class ChatsController {
  private readonly api: typeof ChatsAPI

  constructor() {
    this.api = ChatsAPI
  }

  async getChats() {
    try {
      const response = await this.api.getChats()
      response.map(async (chat) => {
        const token = await this.getConnectTokenController(chat.id)
        if (token) {
          await MessageController.connect(chat.id, token.token)
        }
      })
      store.set('chatsList', response.map(item => ( { ...item, active: false } )))

      return response
    } catch (e: any) {
      console.error(e)
    }
  }


  selectChat(id: number) {
    store.set('activeChatId', id)
    this.getUsersInChatController(id).then((res)=>{store.set('usersList', res)})
  }

  async createChat(title: string) {
    try {
      const response = await this.api.create({ title: title })

      console.log(response)
      return response

    } catch (e: any) {
      console.error(e)
    }
  }

  async deleteChartByIdController(chatId: number) {

    try {
      const response = await this.api.deleteChatById({ chatId })
      console.log(response)

      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async getChatsFilesController(chatId: number) {
    try {
      const response = await this.api.getChatsFiles({ chatId })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async getArchivedChatController(offset?: number, limit?: number, title?: string) {
    try {
      const response = await this.api.getArchivedChat({ offset, title, limit })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async unArchiveChatByIdController(chatId: number) {
    try {
      const response = await this.api.unArchiveChatById({ chatId })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async getCommonChatController(id: number) {
    try {
      const response = await this.api.getCommonChat({ id })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async getUsersInChatController(id: number) {
    try {
      const response = await this.api.getUsersInChat({ id })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async getCountNewMessageController(id: number) {
    try {
      const response = await this.api.getCountNewMessage({ id })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async uploadChatAvatarController(id: number, avatar: FormData) {
    try {
      const response = await this.api.uploadChatAvatar({ id, avatar })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async addUserToChatController(users: number[], chatId: number) {
    try {
      const response = await this.api.addUserToChat({ users, chatId })
      console.log('chatController',response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async deleteUserToChatController(users: number[], chatId: number) {
    try {
      const response = await this.api.deleteUserToChat({ users, chatId })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async getConnectTokenController(id: number) {
    try {
      const response = await this.api.getConnectToken({ id })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

}

export default new ChatsController()
