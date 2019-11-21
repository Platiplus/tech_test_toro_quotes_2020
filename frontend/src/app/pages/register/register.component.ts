import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'plat-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  acceptTerms = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    if (this.authenticationService.tokenValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          terms: ['', Validators.required],
      });
  }

  get field() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      console.log(this.loginForm.invalid)
      console.log(this.loginForm.controls)
      console.log(this.acceptTerms)

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.field.username.value, this.field.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/auth/login']);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}