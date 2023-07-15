import { Component, OnInit } from '@angular/core';
import { idpass } from '../class/idpass';
import { UsersService } from '../service/users.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ListbookComponent } from '../listbook/listbook.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  logidpass: any;
  restok: any;

  constructor(private userservice: UsersService,
    private app: AppComponent,
    private r: Router,
    private aut: AuthService,
    private li: ListbookComponent) {

  }

  ngOnInit(): void {
    this.logidpass = new idpass();
  }

  onSubmit() {
    this.userservice.gettoken(this.logidpass).subscribe(res => {
      this.aut.setToken(res.responestoken);
      this.aut.setUid(res.uid);
      this.restok = res;

      if (this.restok.role == "ADMIN") {
        this.app.admin = true;
      }
      else {
        this.li.f = true;
        this.app.normal = true;
      }
      this.r.navigate(['/home']);

    }, e => {
      this.app.normal = false;
      this.app.admin = false;
      alert("Incorrect Email and Password");
    })
  }

  title = "Login";
}
