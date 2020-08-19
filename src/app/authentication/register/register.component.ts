import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { UserService } from 'src/app/core/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({      
    name: new FormControl(null),    
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
    const userToRegister = new User({
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    });

    this.authenticationService.register(userToRegister)
      .pipe(take(1))
      .subscribe(
        user => {
          this.displayMessage('You have been registered successfully!');
          this.userService.setUser(user);
          this.router.navigate(['/dataSchemas']);
        },
        error => {
          this.displayMessage('The supplied email is already in use. Please login or choose a different email.');
        }
      );
  }

  private displayMessage(message: string) {
    this.snackBar.open(message, null, { duration: 5000 });
  }

}
