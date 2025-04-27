import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';
import { Project, User } from '../../interfaces/project';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  providers: [NgModel],
  imports: [
    MatTableModule,
    NgClass,
    MatSelectModule,
    MatFormFieldModule,
    NgIf,
    MatInputModule,
    FormsModule,
    NgFor,
    MatIconModule,
  ],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss',
})
export class ListProjectsComponent {
  display_columns = [
    'id',
    'name',
    'manager',
    'priority',
    'deadline',
    'actions',
  ];
  custom_data: Project[] = [];
  managers: User[] = [];
  dataSource!: MatTableDataSource<Project>;
  deadlineString!: string;
  priorityClass = '';

  constructor(
    private projServ: ProjectService,
    private userServ: UserService,
    private dialog: MatDialog
  ) {
    projServ.getProjects().subscribe((data: Project[]) => {
      this.custom_data = data;
      this.dataSource = new MatTableDataSource(this.custom_data);
    });
    this.userServ.getManagers().subscribe((managers: User[]) => {
      this.managers = managers;
    });
  }
  set dateTostring(date: Date) {
    this.deadlineString = date.toString().substring(0, 10);
  }

  changePriorityColor(priority: string) {
    //high = red
    if (priority === 'High') {
      return 'high-priority';
    } else if (priority === 'Medium') {
      return 'medium-priority';
    } else {
      return 'low-priority';
    }
  }

  onValueChange(event: string) {
    //alert(event)
    let myArr = event.split(':');
    this.projServ.addManager(myArr[1], myArr[0]);
    alert('success');
  }

  /**
   * Edits the project details
   * @param project Project to be edited
   */
  editProject(project: Project): void {
    this.dialog.open(EditProjectComponent, { width: '500px', data: project });
  }
  deleteProject(project: Project) {
    this.dialog.open(ConfirmationComponent, { width: '500px', data: project });
  }
}
