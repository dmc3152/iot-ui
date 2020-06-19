import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }

}
