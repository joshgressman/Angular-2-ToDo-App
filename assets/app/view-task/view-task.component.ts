import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Task } from '../task.model';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-view',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  animations:[
      trigger('list1',[
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *',[
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
    ]),
    transition('* => void',[
      animate(400, style({
        transform: 'translateX(100px)',
        opacity: 0,
      })),
  ]),
  ]),
]
})

export class ViewTaskComponent implements OnInit {

tasks: Task[] = [];

//test for date ranges
tasksThisMonth: Task[] =[];

constructor(private taskService: TaskService){}

ngOnInit(){
  this.taskService.getTasks()
  .subscribe(
    (response) => {
      this.tasks = response;
      console.log("the tasks", this.tasks);
    },
    (error) => console.log(error)
  );
}

onDelete(id: string){
  this.taskService.deleteTask(id)
  .subscribe(
      result => console.log(result)
     )
     this.taskService.getTasks()
     .subscribe(
       (response) => {
         this.tasks = response;
         console.log("the tasks", this.tasks);
       },
       (error) => console.log(error)
     );
}
//Completes and adds points
onConpleted(id: string, result){
  console.log('data', id);
  var data = {points: result}
  this.taskService.updateToComplete(id, data)
  .subscribe(
    (response) => {
      console.log("update this", id);
    },
    (error) => console.log(error)
     )
     this.taskService.getTasks()
     .subscribe(
       (response) => {
         this.tasks = response;
         console.log("the tasks", this.tasks);
       },
       (error) => console.log(error)
     );
  }

  //view taks in a date range
  // onViewThisMonth(){
  //   this.taskService.getTasksMonth()
  //   .subscribe(
  //     (response) => {
  //       this.tasksThisMonth = response;
  //       console.log("tasks Month",   this.tasksThisMonth);
  //     },
  //     (error) => console.log(error)
  //   );
  // }

}
