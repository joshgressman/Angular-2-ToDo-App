import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from "./app.component";
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TaskService } from './services/task.service';
import { HeaderComponent } from './header/header.component';
import { ViewCompletedComponent } from './view-task/view-completed/view-completed.component';
import { ViewDateComponent } from './view-task/view-date/view-date.component';

@NgModule({
    declarations: [
      AppComponent,
      AddTaskComponent,
      ViewTaskComponent,
      HeaderComponent,
      ViewCompletedComponent,
      ViewDateComponent
    ],
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, routing],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
