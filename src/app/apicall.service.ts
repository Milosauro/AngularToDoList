import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attivita } from './models/attivita.model';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  public createTask(task: Attivita): void{
    let payload = {
        "operation":"create",
        "tableName":"MiloToDo",
        "payload":{
            "Item":{
                "id":task.id,
                "test":task.title,
                "done":task.done
            }
        }
    };
    this.httpcall(payload);
  }

  public deleteTask(task: Attivita): void{
    let payload = {
        "operation":"delete",
        "tableName":"MiloToDo",
        "payload":{
            "Key":{
                "id":task.id
            }
        }
    };
    this.httpcall(payload);
  }

  public toggleTask(task: Attivita): void{
    let payload = {
        "operation":"update",
        "tableName":"MiloToDo",
        "payload":{
            "Key":{
                "id":task.id
            },
            "UpdateExpression": "set done=:d",
            "ExpressionAttributeValues":{
               ":d": task.done
            }
        }
    };
    this.httpcall(payload);
  }

  httpcall(payload: any): void{
    this.httpClient.post(
      "https://bh53gs360j.execute-api.us-west-2.amazonaws.com/Dev/milotodo",
      payload,
      {
        headers: new HttpHeaders().set("content-type","application/json")
      }
    ).subscribe();
  }
}
