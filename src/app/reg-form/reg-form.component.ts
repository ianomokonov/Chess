import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.less']
})
export class RegFormComponent implements OnInit {
  public userForm: FormGroup;
  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  reg(){
    if(this.userForm.invalid){
      return;
    }
    this.authService.registrate(this.userForm.value).subscribe(x => {
      this.router.navigate(['/choose']);
    })
  }

}
