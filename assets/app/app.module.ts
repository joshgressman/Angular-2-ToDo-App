import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TaskService } from './services/task.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
      AppComponent,
      AddTaskComponent,
      ViewTaskComponent,
      HeaderComponent
    ],
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
