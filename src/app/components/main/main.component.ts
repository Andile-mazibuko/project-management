import { Component } from '@angular/core';
import { ListProjectsComponent } from '../list-projects/list-projects.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { AddprojectComponent } from '../addproject/addproject.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { User } from '../../interfaces/project';
import { ListUsersComponent } from '../list-users/list-users.component';
import { SummaryComponent } from '../summary/summary.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
      ListProjectsComponent,
      AddprojectComponent,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatTabsModule,
      FormsModule,
      ListUsersComponent,
      SummaryComponent,
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  user!: User;
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(AddUserComponent, { width: '400px' });
  }
  getSummary() {
    this.dialog.open(SummaryComponent, { width: '600px' });
  }
}
