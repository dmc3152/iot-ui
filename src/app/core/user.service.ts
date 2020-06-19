import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;

  constructor() { }

  getUser(): User {
    return this._user;
  }

  setUser(user: User) {
    this._user = user;
  }
}
