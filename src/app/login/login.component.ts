import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../utils/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  controls() {
    return this.loginForm.controls;
  }

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {}

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.login({ email, password }).subscribe(
      (response: any) => {
        this.router.navigate(['/page/home']);
      },
      (res) => {
        console.log(res);

        alert('Error');
        // alert(res.error.message);
      }
    );
  }
}
