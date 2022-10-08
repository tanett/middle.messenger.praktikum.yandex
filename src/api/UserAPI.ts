import BaseAPI from './BaseAPI';

export interface editUserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string

}

export interface newPasswordData {
  oldPassword: string,
  newPassword: string
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  display_name: string
  role?: string
}

export interface ILightUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

 class UserAPI extends BaseAPI {


  constructor() {
    super('/user');
  }

  changeUserProfile(data: editUserData):Promise<User> {
    return this.http.put('/profile', data);
  }


  changeUserAvatar(data: FormData): Promise<User> {
    console.log('api', data)
    return this.http.put('/profile/avatar', data, true);
  }

  changeUserPassword(data: newPasswordData){
    return this.http.put('/password', data);
  }

  read(id: string): Promise<User>  {
    return this.http.get(`/${id}`);
  }

   searchByLogin(data: {login: string}):Promise<User[] > {
     return this.http.post(`/search`, data);
   }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();
