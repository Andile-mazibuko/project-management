import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../../services/user.service';
import { globalVar } from '../../../utils/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email = ''
  constructor(private fb: FormBuilder,private dialog:MatDialog,private userServ: UserService,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  async login() {
    if (this.loginForm.valid){
      console.log(this.loginForm.value)
      const user = await this.userServ.getUser(this.loginForm.get("email")?.value,this.loginForm.get("password")?.value)
      
      if (user != null){
        globalVar.grantAccess = true
        this.router.navigate(['/main'])        
      }
      

    }else{
      alert("Fill in the required details")
    }
  }
  openDialog(){
    
    this.dialog.open(SignupComponent,{width:'500px',data:this.email})

    this.dialog.afterAllClosed.subscribe(results => {
      console.log("DIALOG DATA",results)
    })
  }
}
