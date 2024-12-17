import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private correctUsername = '123';
  private correctPassword = '123';

  private loggedIn = false;

  loginStatusChanged = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  login(username: string, password: string): boolean {
    if (username === this.correctUsername && password === this.correctPassword) {
      this.loggedIn = true;
      localStorage.setItem('token', 'loggedIn');
      this.loginStatusChanged.emit(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    this.loginStatusChanged.emit(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
