import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ManagerSummary, Project } from '../../interfaces/project';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Chart,registerables } from 'chart.js';
import { log } from 'console';
Chart.register(...registerables)
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  projects: Project[] = [];
  projectSummary: ManagerSummary[] = [];
  sum!: ManagerSummary;
  
  constructor(
    private projServ: ProjectService,
  ) {}

  ngOnInit(): void {
    this.projServ.getProjects().subscribe((resp: Project[]) => {
      for (let i = 0; i < resp.length; i++) {
        const proj = resp[i];
        let managerFound = false;
        let countProjects = 0;

        for (let j = 0; j < this.projectSummary.length; j++) {
          const projSum = this.projectSummary[j];

          if (projSum.email === proj.manager) {
            managerFound = true;
            break;
          }
        }

        if (!managerFound) {
          this.projectSummary.push({
            email: proj.manager!,
            totalProjects:2,
          });
        }
        
      }
      
    });
  }
  

  ngAfterContentInit(){
    //console.log("SADASDSADSADAS",this.projectSummary.map((email)=>email))
    this.renderChart()
  }

  managerSummary(email: string): number {
    let count = 0;
    for (let index = 0; index < this.projects.length; index++) {
      const element = this.projects[index];

      if (element.manager === email) {
        count++;
      }
    }
    return count;
  }

  renderChart(){
    const labels = this.projectSummary.map((email)=>email);
    const values = this.projectSummary.map((totalProjects)=> totalProjects);
    new Chart("myChart",{
      type:'bar',
      data:{
        labels:["andile","Kane","siwe"],
        datasets:[{
          label: 'No of projects assigned per Manager',
          data:[3,4,1],
          
        }]
      },
      options:{
        responsive: true,
        plugins:{
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    })
  }
}
