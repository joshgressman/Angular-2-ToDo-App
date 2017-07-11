import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Task } from '../task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  tasks: Task[] = [];
  viewStats = false;
  totalPoints = 0;
  tasksCompleted = 0;
  time = 0;

  constructor(private authService: AuthService, private taskService: TaskService ){}

  onViewStats(){
    this.viewStats = true;
    this.taskService.getCompletedTasks()
    .subscribe(
      (response) => {
        this.tasks = response;
        console.log(this.tasks);
        this.tasksCompleted = this.tasks.length + 1;
        for(let i = 0; i < this.tasks.length; i++){
          this.totalPoints = this.totalPoints + this.tasks[i].points;
          this.time = this.time + this.tasks[i].time;
        }
      },
      (error) => console.log(error)
    );

  }




  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
