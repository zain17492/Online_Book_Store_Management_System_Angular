import { Component, OnInit } from '@angular/core';
import { Author } from '../class/author';
import { AuthorService } from '../service/author.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {

  title = "Add/Update Author Details";
  aobj: any;
  aobj1: any;
  abj: any;
  edaut: any;
  iid: any;
  constructor(private author: AuthorService, private route: Router, private aroute: ActivatedRoute) {
    this.aobj = new Author();
    this.aobj1 = new Author();

  }
  ngOnInit(): void {
    this.author.getAllAuthor().subscribe(res => {
      this.abj = res;
    }, e => console.log("error")
    )
  }

  submitclk() {
    if (this.aobj.aname == "" && this.aobj.aemail != "") {
      alert("Enter Author Name !!")
    } else if (this.aobj.aemail == "" && this.aobj.aname != "") {
      alert("Enter Author Email !!")
    } else if (this.aobj.aname == "" && this.aobj.aemail == "") {
      alert("Enter Data in both the Field !!")
    } else {
      this.author.addAuthor(this.aobj).subscribe(re => {
        alert("Author Added !!")
        this.ngOnInit();
        this.aobj.aname = "";
        this.aobj.aemail = "";
        this.route.navigate(['/addauthor'])
      }, e => {
        alert("Error While Adding Author !!")
        this.aobj.aname = "";
        this.aobj.aemail = "";
      })
    }
  }

  showdetails(aid: any) {

    this.author.getAuthor(aid).subscribe(res => {
      this.aobj1 = res;
    }, e => {
      console.log("error");
    })
  }

  editauthor(aid: any) {


    this.showdetails(aid);
    this.ngOnInit();
    this.edaut = true;
    this.iid = aid;
    this.route.navigate(['/addauthor']);
  }

  updateAuth() {

    this.author.updateAuthor(this.iid, this.aobj1).subscribe(result => {
      alert("Author Details Updated !!")
      this.ngOnInit()
      this.route.navigate(['/addauthor'])
    }, e => {
      alert("Error While Updating Author Details !!");
    })
    this.aobj1.aname = ""
    this.aobj1.aemail = ""
    this.edaut = false
  }

  deleteAuthor(aid: any) {
    this.author.deleteAuthor(aid).subscribe(res => {
      alert("Author Details Deleted !!");
      this.ngOnInit();
      this.route.navigate(['/addauthor'])
    }, e => {
      console.log("error");

    })
  }

}
