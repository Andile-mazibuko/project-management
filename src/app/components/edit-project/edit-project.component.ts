import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Project, User } from '../../interfaces/project';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatFormFieldModule,MatSelectModule,MatInputModule,NgFor,MatDatepickerModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent implements OnInit{
  
  editProjectForm!: FormGroup;
  project!:Project;
  managers: User[] = []

  constructor(private fb: FormBuilder,private userServ:UserService,private dialog: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data:Project){
    }
  ngOnInit(): void {
    this.userServ.getUsers().subscribe((managers:User[])=>{
      this.managers = managers
    })
    
    this.editProjectForm = this.fb.group({
      name: [this.data.name,Validators.required],
      priority:[this.data.priority,Validators.required],
      manager:[this.data.manager,Validators.required],
      deadline:[this.data.deadline,Validators.required]        
    })
  }
    cancel(){
      this.dialog.close()
    }
    edit(){
      if (this.editProjectForm.valid){
        console.log(this.editProjectForm.value)
      }else{
        alert("Invalid Form")
      }
      this.dialog.close()
    }

}
