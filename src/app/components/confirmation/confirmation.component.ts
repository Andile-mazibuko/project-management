import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  constructor( private projServ: ProjectService,private dialog:MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA)private data:Project){

  }
  deleteProject(){
    console.log(this.data)
    this.projServ.deleteProject(this.data)
    this.dialog.close()
  }
  cancelDialog(){
    this.dialog.close()
  }
}
