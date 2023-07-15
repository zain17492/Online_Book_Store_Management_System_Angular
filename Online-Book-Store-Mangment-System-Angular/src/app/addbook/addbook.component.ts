import { Component, OnInit } from '@angular/core';
import { Book } from '../class/book';
import { Author } from '../class/author';
import { BookserviceService } from '../service/bookservice.service';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit{
  title="Add/Edit Book Details";
  f!:boolean;
  bk:any;
  bk1:any;
  auth:any;
  auth1:any;
  bb:any;
  aa:any;
  constructor(private book:BookserviceService,private author:AuthorService){
    this.bk=new Book();
    this.auth=new Author();
    this.bk1=new Book();
    this.auth1=new Author();
  }
  ngOnInit(): void {
    this.book.getAllBook().subscribe(b=>this.bb=b,e=>console.log("Error"));
    this.author.getAllAuthor().subscribe(a=>this.aa=a,e=>console.log("Error"));
  }


  editBook(bid:any){
    this.f=true;
    this.book.getBookId(bid).subscribe(bo=>
      {
        this.bk1=bo;
        this.auth1.aid=this.bk1.author.aid;
      },e=>console.log("Error"))
  }

  submiteditbook(){
    this.bk1.author=this.auth1;
    this.book.updateBook(this.bk1.bid,this.bk1).subscribe(re=>{
      alert("Book Details Updated !!");
      this.ngOnInit();
      this.f=false;
    },e=>{
      console.log("Error While Updating Book Details !!");
      
    })
    
  }

  deletebook(bid:any){
    this.book.deleteBook(bid).subscribe(re=>{
      alert("Book Details Deleted !!");
      this.ngOnInit();
    },e=>{
      console.log("Error");
    })
  }

  onSubmit(){
    this.bk.author=this.auth 
      this.book.addBook(this.bk).subscribe(re=>{
        alert("Book Details Added !!")
        this.bk.bname=""
        this.auth.aid=""
        this.bk.author=this.auth
        this.bk.price=""
        this.ngOnInit();
      },e=>alert("Error While Entering Book Details or Enter the Correct Data into Input Field !!"))
  }
}
