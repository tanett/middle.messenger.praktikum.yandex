import BaseAPI from './BaseAPI';



export class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

 getFile(data:{path: string}) {
    return this.http.get(`/${data.path}`);
  }


 uploadFile(data: FormData):Promise<{
   'id': number,
   'user_id': number,
   'path': string,
   'filename': string,
   'content_type': string,
   'content_size': number,
   'upload_date': string
 }> {
    return this.http.post('', data);
  }

read=undefined
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ResourcesAPI();
