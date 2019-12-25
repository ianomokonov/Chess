import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websockets.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.less']
})
export class AuthFormComponent implements OnInit {
  public userForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router, 
    private fb: FormBuilder,
    private ws: WebsocketService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Login: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required]
    })
    this.ws.socket.pipe(
      filter(vl => vl)
    ).subscribe(x => {
      console.log(x);
      if (x!=null) {
        sessionStorage.setItem('userId', x);
        this.router.navigate(['/choose']);
      }
      else{
        return;
      }
    })
  }

  login(){
    if(this.userForm.invalid){
      console.log(this.userForm)
      return;
    }
    this.ws.socket.next({key:'log-in', value: this.userForm.value});
  }

}
