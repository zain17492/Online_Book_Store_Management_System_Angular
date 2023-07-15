import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  normal = false;
  admin = false;
  constructor(private r: Router, private aut: AuthService, private userService: UsersService) {

  }
  ngOnInit(): void {

    

  }

  adminlogout() {
    this.admin = false;
    this.aut.removeToken();
    this.r.navigate(['/home']);
  }

  editprofile() {
    let uid = this.aut.getUid();
    this.r.navigate(['/register', uid]);
  }

  userlogout() {
    this.normal = false;
    this.aut.removeToken();
    this.r.navigate(['/home']);

  }

  title = 'Online Book Store Management System';
}
