import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/project';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private userServ: UserService,private dialogRef: MatDialogRef<SignupComponent>,@Inject(MAT_DIALOG_DATA)public dialogData:string) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }
  register() {
    const formValue = this.signUpForm.value;

    if (this.signUpForm.valid) {
      if (formValue.password != formValue.confirm_password) {
        alert("Passwords doen't match");
        this.signUpForm.get('confirm_password')?.setValue('');
      } else {
        //TODO: Store user in a data base
        const user: User = {
          first_name: formValue.first_name,
          last_name: formValue.last_name,
          email: formValue.email,
          password:formValue.password,
        };
        this.userServ.createManager(user);

       // this.dialogData = formValue.email
        this.dialogRef.close()
      }
    } else {
      alert('Fill in the required details');
    }
  }
  
}
