import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'q';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateservice: ValidateService,
    private flashmessagesservice: FlashMessagesService,
    private authservice: AuthService,
    private router:Router) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    //required fields
    if (!this.validateservice.validateRequest(user)) {
      this.flashmessagesservice.show('please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //vaid email
    if (!this.validateservice.validateEmail(user.email)) {
      this.flashmessagesservice.show('please fill in a valid email', { cssClass: 'alert-danger', timeout: 3000 });

      return false;
    }
    //register user
    this.authservice.registerUser(user).subscribe(data =>{
      if(data){
        this.flashmessagesservice.show('you are now registerd and can login', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      }
      else{
        this.flashmessagesservice.show('something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);

      }
    })
  }

}
