import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { AddprojectComponent } from './components/addproject/addproject.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { User } from './interfaces/project';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project-management-app';
  user!: User;
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(AddUserComponent, { width: '400px' });
  }
  getSummary() {
    this.dialog.open(SummaryComponent, { width: '600px' });
  }
}
