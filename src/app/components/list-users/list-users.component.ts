import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ListUsersComponent implements OnInit, OnDestroy {
  display_columns = ["id", "First Name", "Last Name", "Email"]
  dataSource!: MatTableDataSource<User>
  managers: User[] = []

  managersSub: any;

  constructor(private userServ: UserService) {



  }

  ngOnInit(): void {
    this.managersSub = this.userServ.getUsers().subscribe((managers: User[]) => {
      this.managers = managers
      this.dataSource = new MatTableDataSource(managers)
    })
  }

  ngOnDestroy(): void {

    this.managersSub.unsubscribe();
  }


}
