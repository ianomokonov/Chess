import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websockets.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.less']
})
export class RegFormComponent implements OnInit {
  public userForm: FormGroup;
  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private ws:WebsocketService ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Name: [null, Validators.required],
      Login: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required]
    })
    this.ws.socket.pipe(
      filter(vl => vl)
    ).subscribe(x => {
      console.log(x);
      sessionStorage.setItem('userId', x);
      this.router.navigate(['/choose']);
    })
  }

  reg(){
    if(this.userForm.invalid){
      return;
    }
    this.ws.socket.next({key:'add-user', value: this.userForm.value});
    // this.authService.registrate(this.userForm.value).subscribe(x => {
    //   this.router.navigate(['/choose']);
    // })
  }

}
