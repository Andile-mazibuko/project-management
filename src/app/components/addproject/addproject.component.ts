import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule} from '@angular/material/icon';
import { Project, User } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-addproject',
  standalone: true,
  providers:[],
  imports: [MatFormFieldModule,MatFormFieldModule,MatInputModule,FormsModule,MatSelectModule,MatDatepickerModule,MatIconModule,NgFor],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.scss'
})
export class AddprojectComponent {
  project:any ={
    name:'',
    deadline: new Date,
    priority: 'High',
    manager:''
  } 
  managers: User[] = []

  constructor(private projServ: ProjectService, private userServ: UserService){
    this.userServ.getManagers().subscribe((managers:User[])=>{
      this.managers = managers
    })
  }
  
  addProject(){
    
    const newProj:Project = {
      name: this.project.name,
      deadline: this.project.deadline.toString().substring(0,10),
      priority: this.project.priority,
      manager: this.project.manager
      
    }
    this.projServ.addProject(newProj)

    this.project ={
      name:'',
      deadline: '',
      priority: 'High',
    } 
    alert('Project Succesfully Added')
  }
}
