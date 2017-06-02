import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TaskService } from '../services/task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-add',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  myForm: FormGroup;

  constructor(private taskService: TaskService){}

  onSubmit(){
    console.log('myForm', this.myForm);
   const task = new Task(
     this.myForm.value.name,
     this.myForm.value.description,
     this.myForm.value.due,
     this.myForm.value.complete
   );
   console.log('task', task);
    this.taskService.addTask(task)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.myForm.reset();
  }

  ngOnInit(){
    this.myForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      due: new FormControl(null),
      complete: new FormControl(false)
    });
  }

}
