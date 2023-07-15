import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Users } from '../class/Users';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "http://localhost:8080/home";
  constructor(private ht: HttpClient,
    private aut: AuthService) {

  }

  addUser(user: Users): Observable<Object> {
    return this.ht.post<Users>(this.url + "/reg", user);
  }

  gettoken(logidpass: any): Observable<any> {
    return this.ht.post<any>(this.url + "/gettoken", logidpass);
  }

  getByUser(uid: any): Observable<any> {
    const header = this.aut.getHeader();
    return this.ht.get<any>("http://localhost:8080/user/getUserById/" + uid, { headers: header });
  }

  updateUser(uid: any, userobj: any): Observable<any> {
    const header = this.aut.getHeader();
    return this.ht.put<any>("http://localhost:8080/user/updateUser/" + uid, userobj, { headers: header });
  }

  updateUsersPassword(uid: any, res: any) {
    const header = this.aut.getHeader();
    return this.ht.post("http://localhost:8080/user/setRestPass/" + uid, res, { headers: header })
  }

  getAllUsers(): Observable<any> {
    const header = this.aut.getHeader();
    return this.ht.get<any>("http://localhost:8080/user/getAllUsers", { headers: header });
  }

  deleteUser(uid:any){
    const header = this.aut.getHeader();
    return this.ht.delete("http://localhost:8080/user/deleteUserById/"+uid, { headers: header });
  }

}
