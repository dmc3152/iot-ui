import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.isLoggedIn()
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
}
