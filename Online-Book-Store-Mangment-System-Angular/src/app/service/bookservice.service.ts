import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../class/book';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  private url = "http://localhost:8080/book";
  constructor(private ht: HttpClient,private aut:AuthService) { }


  addBook(book:any):Observable<any>{
    const head=this.aut.getHeader();
    return this.ht.post<any>(this.url+"/addBook",book,{headers:head});
  }

  updateBook(bid:any,book:any):Observable<any>{
    const head=this.aut.getHeader();
    return this.ht.put<any>(this.url+"/updateBook/"+bid,book,{headers:head});
  }

  getAllBook(): Observable<Book> {
    return this.ht.get<Book>(this.url + "/getAllBook");
  }

  getBookId(bid:any): Observable<Book> {
    const head=this.aut.getHeader();
    return this.ht.get<Book>(this.url + "/getBook/"+bid,{headers:head});
  }

  deleteBook(bid:any):Observable<any>{
    const head=this.aut.getHeader();
    return this.ht.delete<any>(this.url+"/deleteBook/"+bid,{headers:head})
  }
}
