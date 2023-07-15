import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { Users } from '../class/Users';
import { AppComponent } from '../app.component';
import { AuthService } from '../service/auth.service';
import { restp } from '../class/restp';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: any;
  usersobj: any;
  flage = false;
  restflage = false;
  repass!: any;
  constructor(private user: UsersService,
    private route: Router,
    private aroute: ActivatedRoute,
    private app: AppComponent,
    private aut: AuthService) {
  }
  ngOnInit(): void {
    this.users = new Users();
    this.usersobj = new Users();
    this.repass = new restp();
    this.flage = this.app.normal;

    this.aroute.paramMap.subscribe(parme => {
      let uid = parme.get('uid');
      this.user.getByUser(uid).subscribe(res => {
        this.usersobj = res;
      }, e => console.log("error"));
    });

  }

  addUsers() {
    if (this.users.password == this.users.cpwd) {
      this.user.addUser(this.users).subscribe(re => {
        alert(this.title + " Done !!");
        this.gotoHome();
      }, e => {
        alert(this.users.email + " or " + this.users.uphone + " is Already Present in Database !!")
        this.gotoHome()
      })
    } else {
      alert("Password and Confirm Password are Not Matching !!")
    }
  }

  submitclk() {
    if (this.app.normal == true) {
      this.aroute.paramMap.subscribe(parme => {
        let uid = parme.get('uid');
        this.user.updateUser(uid, this.usersobj).subscribe(res => {
          alert("Details Updated need to logout!!");
          this.app.normal = false;
          this.route.navigate(['/home']);
        }, e => console.log("error"));
      });

    } else {
      this.addUsers();
    }
  }

  restpass() {
    this.restflage = true;
  }

  restpassconfirm() {
    if (this.repass.cpwd != this.repass.pwd1) {
      alert("Password and Confirm Password not mathch !!")
    } else if ((this.repass.pwd == this.repass.pwd1) || (this.repass.pwd == this.repass.cpwd)) {
      alert("Old Password and New Password is not match !!")
    }
    else {
      this.aroute.paramMap.subscribe(p => {
        const uid = p.get('uid');
        this.user.updateUsersPassword(uid, this.repass).subscribe(res => {
          alert("Password is Updated need to logout !!")
          this.app.normal = false;
          this.route.navigate(['/home']);
        }, e => alert("Old Password is not Match !!")
        )
      });
    }
  }

  gotoHome() {
    this.route.navigate(['home']);
  }
  title = "Registration";
}
