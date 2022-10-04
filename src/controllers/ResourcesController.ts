import store from '../utils/Store'
import router from '../utils/Router'
import UserAPI, { editUserData, newPasswordData } from '../api/UserAPI'
import ResourcesAPI from '../api/ResoursesAPI'

export interface IResources {
  id:	number , // Message id
  user_id:	number,
  path:	string, //  Server relative file path
  filename:	string,
  content_type:	string,//  File content type (e.g "image/jpeg" for .jpg images)

  content_size:	number,//  File size in bytes

  upload_date: string
}


class ResourcesController {
  private readonly api: typeof ResourcesAPI

  constructor() {
    this.api = ResourcesAPI
  }

  async getResources(path: string) {
    try {
      const response = await this.api.getFile({ path: path })
      console.log(response)
      return response
    } catch (e: any) {
      console.error(e)
    }
  }

  async uploadFile(file: FormData) {
    try {
      const response = await this.api.uploadFile(file)
      console.log(response)
      return response

    } catch (e: any) {
      console.error(e.message)
    }
  }


}

export default new ResourcesController()
