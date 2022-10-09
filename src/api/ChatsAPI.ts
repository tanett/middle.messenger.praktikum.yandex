import BaseAPI from './BaseAPI'
import { ILightUser, User } from '../api/UserAPI'


export interface IChats {
  'id': number,
  'title': string,
  'avatar': string,
  'unread_count': number,
  'last_message': {
    'user': ILightUser,
    'time': string,
    'content': string

  },
  active?: boolean
}

class ChatsAPI extends BaseAPI {


  constructor() {
    super('/chats')
  }

  getChats(): Promise<IChats[]> {
    return this.http.get('')
  }


  create(data: {
    'title': string
  }): Promise<Response> {
    return this.http.post('', data)
  }


  deleteChatById(data: { chatId: number }): Promise<{
    'userId': number,
    'result': {
      'id': number,
      'title': string,
      'avatar': string
    }
  }> {
    return this.http.delete("", data)
  }

 getChatsFiles(data: {chatId: number }): Promise<{
   "id": number,
   "user_id": number,
   "chat_id": number,
   "time": string,
   "type": string,
   "content": number,
   "file": {
     "id": number,
     "user_id": number,
     "path": string,
     "filename": string,
     "content_type": string,
     "content_size": number,
     "upload_date": string
   }
 }[]> {
    return this.http.get(`/${data.chatId}/files`)
  }

  getArchivedChat(data: {offset?: number, limit?: number, title?: string }): Promise<{
    "id": number,
    "title": string,
    "avatar": string,
    "unread_count": number,
    "last_message": {
      "user": ILightUser,
      "time": string,
      "content": string
    }
  }[]> {
    const queryParam= Object.entries(data).map((item)=> {return `${ item[0] }=${item[1] }`}).join('&')

    return this.http.get(`/archive?${queryParam}`)
  }

  unArchiveChatById(data:{"chatId": number}):Promise<{
    "userId": number,
    "result": {
    "id": number,
      "title": string,
      "avatar": string,
      "unread_count": number,
      "last_message": {
      "user": ILightUser,
      "time": string,
        "content": string
    }
  }
  }> {
    return this.http.post(`/unarchive`, data)
}

  getCommonChat(data:{"id": number}):Promise<{
    "userId": number,
    "result": {
      "id": number,
      "title": string,
      "avatar": string,
      "unread_count": number,
      "last_message": {
        "user": ILightUser,
        "time": string,
        "content": string
      }
    }
  }[]> {
    return this.http.get(`/${data.id}/common`)
  }

  getUsersInChat(data:{"id": number}):Promise<User[]> {
    return this.http.get(`/${data.id}/users`)
  }

  getCountNewMessage(data:{"id": number}):Promise<{"unread_count": 12 }> {
    return this.http.get(`/new/${data.id}`)
  }

  uploadChatAvatar(data:{"id": number, avatar: FormData}):Promise<IChats> {
    return this.http.put(`/avatar`, data)
  }

  addUserToChat(data:{users: number[],chatId: number}):Promise<Response> {

    return this.http.put(`/users`, data)
  }

  deleteUserToChat(data:{users: number[],chatId: number}):Promise<Response> {
    return this.http.delete(`/users`, data)
  }

  getConnectToken(data:{id: number}):Promise<{token: string}> {
    return this.http.post(`/token/${data.id}`)
  }


  read= undefined
  update = undefined
  delete = undefined
}

export default new ChatsAPI()
