
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";
import { TaskService } from '../../services/task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-view-date',
  templateUrl: './view-date.component.html'
})

export class ViewDateComponent implements OnInit {
  myForm: FormGroup;
  myDate = {start: Date, end: Date};
  tasks: Task[] = [];
  constructor(private taskService: TaskService){}

  onSubmit(){
    var dates = {start: this.myForm.value.start, end: this.myForm.value.end};
    console.log("data", dates);
    this.taskService.getTasksDate(dates)
    .subscribe(
      (response) => {
        this.tasks = response;
        console.log("response", response)
      },
        (error) => console.log("ERROR", error)
    );
    console.log("this tasks", this.tasks);
  }

 ngOnInit(){
   this.myForm = new FormGroup({
     start: new FormControl(null),
     end: new FormControl(null)
   });
 }
}
