import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService implements OnInit {

  private url = "http://localhost:8080/author/";
  constructor(private ht: HttpClient, private aut: AuthService) { }
  ngOnInit(): void {
  }


  addAuthor(auth: any): Observable<any> {
    const head = this.aut.getHeader();
    return this.ht.post<any>(this.url + "addAuthor", auth, { headers: head });
  }

  getAllAuthor(): Observable<any> {
    const head = this.aut.getHeader();
    return this.ht.get<any>(this.url + "getAllAuthor", { headers: head });
  }
  getAuthor(aid: any): Observable<any> {
    const head = this.aut.getHeader();
    return this.ht.get<any>(this.url + "getAuthor/" + aid, { headers: head });
  }

  updateAuthor(aid: any, obj: any): Observable<any> {
    const head = this.aut.getHeader();
    return this.ht.put<any>(this.url + "updateAuthor/" + aid, obj, { headers: head });
  }

  deleteAuthor(aid: any): Observable<any> {
    const head = this.aut.getHeader();
    return this.ht.delete<any>(this.url + "deleteAuthor/" + aid, { headers: head });
  }
}
