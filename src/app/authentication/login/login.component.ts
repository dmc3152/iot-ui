import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from '../authentication.service';
import { UserService } from 'src/app/core/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({          
    email: new FormControl(null, Validators.email),
    password: new FormControl(null)
  });

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .pipe(take(1))
      .subscribe(
        user => {
          this.userService.setUser(user);
          this.router.navigate(['/dataSchemas']);
        },
        error => {
          this.snackBar.open('Your email or password is incorrect. Please try again.', null, { duration: 5000 });
        }
      );
  }

}
