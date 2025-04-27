import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../interfaces/project';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  
  //user:User = {first_name:'',last_name:'',email:''}
  users:User[] = []
  managerForm: FormGroup;
  constructor(private dialog:MatDialogRef<AddUserComponent>,private userServ: UserService,private fb:FormBuilder){
      this.managerForm = this.fb.group({
        first_name:['',Validators.required],
        last_name:['',Validators.required],
        email:['',Validators.required]
    })

    this.userServ.getManagers().subscribe((users:User[])=>{
      this.users = users
      console.log(users)
    })


    this.managerForm.get('email')?.valueChanges.subscribe((value:string) =>{
      if (this.checkIfUserExist(value)) {
        alert("Manager already exist")
        this.managerForm.get('email')?.setValue('')
      }
    })
    }
  
  addUser(){ 
    const user:User = this.managerForm.value
    
    if(this.managerForm.valid){
       this.userServ.createManager(user)
       alert("User successfully added")
       this.dialog.close()
    }else{
      alert("Please fill in the required details")
    }  
      
    
  }
  
  
  noThanks(){
    this.dialog.close()
  }


  checkIfUserExist(email:string){
    let exist = false
    for (let index = 0; index < this.users.length; index++) {
      let element = this.users[index];
      if(element.email == email){
        exist = true;
        break
      }
    }
    return exist 
  }

}
