import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attivita } from './models/attivita.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  // public createTask(task: Attivita): void{
  //   let payload = {
  //       "operation":"create",
  //       "tableName":"MiloToDo",
  //       "payload":{
  //           "Item":{
  //               "id":task.id,
  //               "test":task.title,
  //               "done":task.done
  //           }
  //       }
  //   };
  //   this.httpcall(payload);
  // }

  // public deleteTask(task: Attivita): void{
  //   let payload = {
  //       "operation":"delete",
  //       "tableName":"MiloToDo",
  //       "payload":{
  //           "Key":{
  //               "id":task.id
  //           }
  //       }
  //   };
  //   this.httpcall(payload);
  // }

  // public toggleTask(task: Attivita): void{
  //   let payload = {
  //       "operation":"update",
  //       "tableName":"MiloToDo",
  //       "payload":{
  //           "Key":{
  //               "id":task.id
  //           },
  //           "UpdateExpression": "set done=:d",
  //           "ExpressionAttributeValues":{
  //              ":d": task.done
  //           }
  //       }
  //   };
  //   this.httpcall(payload);
  // }

  //Laravell

  public apiGetAllPost() : any {
    return this.httpClient.get(
      "http://localhost:8000/api/tasks"
    );
  }

  public apiPost(task: Attivita) : any {
    return this.httpClient.post(
      "http://localhost:8000/api/tasks",
      {title: task.title, done: task.done, user: 'milo'}
    );
  }

  public apiDelete(task: Attivita) : any {
    return this.httpClient.delete(
      "http://localhost:8000/api/tasks/"+task.id
    );
  }

  public apiPut(task: Attivita) : any {
    return this.httpClient.put(
      "http://localhost:8000/api/tasks/"+task.id,
      {title: task.title, done: !task.done, user: 'milo'}
    );
  }

  public apiDeleteAll() : any {
    return this.httpClient.delete(
      "http://localhost:8000/api/tasks/"
    );
  }

}
