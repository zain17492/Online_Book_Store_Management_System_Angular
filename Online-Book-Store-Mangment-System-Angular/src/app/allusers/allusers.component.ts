import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  u!: any;
  constructor(private user: UsersService) {
  }

  ngOnInit(): void {
    this.user.getAllUsers().subscribe(re => {
      this.u = re;
    }, e => console.log("error")
    )
  }

  deleteUsers(uid:any){
    this.user.deleteUser(uid).subscribe(re=>{
      alert("User Details Deleted !!");
      this.ngOnInit();
    },e=>{
      alert("Error");
    })
  }

}
