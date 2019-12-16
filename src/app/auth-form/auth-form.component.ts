import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.less']
})
export class AuthFormComponent implements OnInit {
  public userForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  login(){
    if(this.userForm.invalid){
      console.log(this.userForm)
      return;
    }
    
    this.authService.enter(this.userForm.value.email, this.userForm.value.password).subscribe(
      () => {},
      error => {
        sessionStorage.setItem('userToken', 'default_user'); // TODO убрать в проде
        this.router.navigate(['/choose']);
      }
    )
  }

}
