
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Task } from '../task.model';

@Injectable()
export class TaskService {

  constructor(private http: Http){}

 addTask(task: Task){
   const body = JSON.stringify(task);
   const headers = new Headers({'Content-Type': 'application/json'});
   return this.http.post('http://localhost:3000/task', body, {headers: headers})
   .map((response: Response) => response.json())
   .catch((error: Response) => {
              return Observable.throw(error.json());
          });
 }

 getTasks(){
   return this.http.get('http://localhost:3000/task')
   .map(res => res.json())
   .catch((error: Response) => {
              return Observable.throw(error.json());
          });
 }

 deleteTask(id: string){
   console.log('ID from task', id);
   return this.http.delete('http://localhost:3000/task/' + id)
     .map(res => res);
 }

 getCompletedTasks(){
   return this.http.get('http://localhost:3000/completed')
   .map(res => res.json())
   .catch((error: Response) => {
    return Observable.throw(error.json());
    });
 }

 updateToComplete(id: string, data: {}){
   console.log('data in service', id, data);
   return this.http.put('http://localhost:3000/completed/' + id, data)
   .map(res => res);
 }

}
