import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

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
    private registerService: RegisterService 
  ) {}

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

      if (this.loginForm.invalid) {
          return;
      }

      console.log(this.field.username.value, this.field.password.value)

      this.loading = true;
      this.registerService.register(this.field.username.value, this.field.password.value)
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