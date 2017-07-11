import { Component } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-view-completed',
  templateUrl: './view-completed.component.html',
  styleUrls: ['./view-completed.component.css']
})

//Moved data to the header

export class ViewCompletedComponent{
// tasks: Task[] = [];
// viewStats = false;
// totalPoints = 0;
// tasksCompleted = 0;
// time = 0;

constructor(private taskService: TaskService){}

onViewStats(){
//   this.viewStats = true;
//   this.taskService.getCompletedTasks()
//   .subscribe(
//     (response) => {
//       this.tasks = response;
//       console.log(this.tasks);
//       this.tasksCompleted = this.tasks.length + 1;
//       for(let i = 0; i < this.tasks.length; i++){
//         this.totalPoints = this.totalPoints + this.tasks[i].points;
//         this.time = this.time + this.tasks[i].time;
//       }
//     },
//     (error) => console.log(error)
//   );
//
// }

}
