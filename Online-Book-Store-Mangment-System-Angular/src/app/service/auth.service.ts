import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem("token", token)
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUid(uid: string): void {
    localStorage.setItem("id", uid);
  }

  getUid() {
    return localStorage.getItem("id");
  }

  removeToken(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  getHeader(): HttpHeaders {
    const t = this.getToken();
    let headers = new HttpHeaders();
    if (t) {
      headers = headers.set('Authorization', `Bearer ${t}`);
    }
    return headers;
  }
}



