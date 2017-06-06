import { Component } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-view-completed',
  templateUrl: './view-completed.component.html',
  styleUrls: ['./view-completed.component.css']
})

export class ViewCompletedComponent{
tasks: Task[] = [];
viewStats = false;
public totalPoints: number;

constructor(private taskService: TaskService){}

onViewStats(){
  this.viewStats = true;
  this.taskService.getCompletedTasks()
  .subscribe(
    (response) => {
      this.tasks = response;
      console.log("the tasks", this.tasks);
      for(let i = 0; i < this.tasks.length; i++){
        console.log('added points');
      }
    },
    (error) => console.log(error)
  );

}

}
