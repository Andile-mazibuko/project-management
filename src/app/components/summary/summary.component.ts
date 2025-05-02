import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ManagerSummary, Project, User } from '../../interfaces/project';
import { Chart, registerables } from 'chart.js';
import { UserService } from '../../services/user.service';
Chart.register(...registerables);
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
  managers: User[] = [];

  constructor(
    private projServ: ProjectService,
    private userServ: UserService
  ) {}

  ngOnInit(): void {
    this.userServ.getUsers().subscribe((resp: User[]) => {
      this.managers = resp;
      this.renderChart();
    });

    this.projServ.getProjects().subscribe((resp: Project[]) => {
      this.projects = resp;

      for (let i = 0; i < resp.length; i++) {
        const proj = resp[i];
        let managerFound = false;
        let countProjects = 0;

        for (let j = 0; j < this.projectSummary.length; j++) {
          const projSum = this.projectSummary[j];

          if (projSum.email === proj.manager) {
            managerFound = true;
            
            break;
          }else{
            managerFound = false

          }
        }

        if (!managerFound) {
          this.projectSummary.push({
            email: proj.manager!,
            totalProjects: 1,
          });
        } else {
          const index = this.projectSummary.findIndex(
            (p) => p.email === proj.manager
          );
          if (index !== -1) {
            this.projectSummary[index].totalProjects = this.countProjPerManager(
              proj.manager!
            );
          }
        }
      }
    });
  }

  countProjPerManager(email: string): number {
    let count = 0;
    this.projects.forEach((element) => {
      if (element.manager == email) {
        count++;
      }
    });

    return count;
  }

  renderChart() {
    const labels = this.projectSummary.map((sum) => sum.email.split('@')[0]);

    const values = this.projectSummary.map((sum) => sum.totalProjects);
    new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'No of projects assigned per Manager',
            data: values,
            backgroundColor: ['#008080', '#6A5ACD', '#2E8B57', '#4682B4'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        },
      },
    });
  }
}
