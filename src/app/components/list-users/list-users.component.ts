import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../interfaces/project';
import { UserService } from '../../services/user.service';
 
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  display_columns = ["id","First Name","Last Name","Email"]
  dataSource!: MatTableDataSource<User>
  managers: User[]= []

  constructor(private userServ: UserService){
    this.userServ.getManagers().subscribe((managers:User[])=>{
      this.managers = managers
      this.dataSource = new MatTableDataSource(managers)
    })
  }

  



}
