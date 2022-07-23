import { Component, OnInit} from '@angular/core';
import { Attivita } from '../models/attivita.model';
import { StorageService } from '../storage.service';
import { ApicallService } from '../apicall.service';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  todoTitle: string;
  allTodoList: Attivita[];  
  loadedTodoArray: Attivita[];
  filter: any;
  tasks: Attivita[];

  constructor(private storageStore: StorageService, private cookieService:CookieService, private httpClient: HttpClient, private AWSapi:ApicallService) { 
    this.todoTitle = "";
    this.allTodoList = [];
    this.loadedTodoArray = [];
    this.filter = "all";
    this.tasks = [];
  }

  ngOnInit(): void {

    console.log("v 0.0.1");
    this.fetchTasks();
    // if(this.cookieService.get("save") == null){
    //   console.log("Cookies empty");
    
    //   if(this.storageStore.getData("save") == null){
    //     console.log("Storage empty");
    //   }
    //   else{
    //     this.storageReadSaveJSON();
    //     console.log("Storage found");
    //   }
    // }
    // else{
    //   this.cookieReadSaveJSON();
    //   console.log("Cookies found");
    // }
  }

  fetchTasks() : void {
    this.AWSapi.apiGetAllPost().subscribe(
      (response: any) =>{
        this.tasks = response['tasks'];
        this.update();
      }
    );
  };

  update(){ 
    this.allTodoList = [];
    this.tasks.forEach(task => this.allTodoList.push(task)); 
    this.changeView(this.filter);
  }

  //Update new ToDo title on input/text change
  onChangeTodoTitle(title: string): void {
    this.todoTitle = title;
  }

  //Add new ToDo
  todoAdd(): void {
    if(this.todoTitle != "" && this.todoTitle != " "){
      const task = new Attivita(this.todoTitle);
      this.AWSapi.apiPost(task).subscribe(
        () =>{
          this.fetchTasks();
        });
    }
    this.todoTitle = '';
    this.fetchTasks();
  }

  //Delete selected ToDo
  todoDelete(task: Attivita): void{
    this.AWSapi.apiDelete(task).subscribe(
      () =>{
        this.fetchTasks();
      });
  }

  //Delete all ToDo
  todoDeleteAll(){
    this.AWSapi.apiDeleteAll().subscribe(
      () =>{
        this.fetchTasks();
      });
  }

  //Set selected ToDo done or not done
  toggleDone(task: Attivita): void{
    this.AWSapi.apiPut(task).subscribe(
      () =>{
        this.fetchTasks();
      });
  }

  //Set listed ToDo
  changeView(condition: any){
    this.filter = condition;
    if(condition == "all"){
      this.loadedTodoArray = this.allTodoList;
    }
    else{
      this.loadedTodoArray = this.allTodoList.filter(item => item.done == condition);
    }
  }

  getDoneTask(): number{
    return this.allTodoList.filter(elem => elem.done == true).length;
  }

  getNotDoneTask(): number{
    return this.allTodoList.filter(elem => elem.done == false).length;
  }

  storageSaveJSON(): void{
    let taskJSON = [];
    taskJSON = this.allTodoList.map( task => ({id: task.id, title: task.title, done: task.done }));
    this.storageStore.clearData();
    this.storageStore.saveData("save" , JSON.stringify(taskJSON));
  }

  cookieSaveJSON(): void{
    let taskJSON = [];
    taskJSON = this.allTodoList.map( task => ({id: task.id, title: task.title, done: task.done }));
    this.cookieService.delete("save");
    this.cookieService.set("save" , JSON.stringify(taskJSON));
  }

  storageReadSaveJSON(): void{
    let storageSave = "" + this.storageStore.getData("save");
    if(storageSave != ""){
      let jsonSave = JSON.parse(storageSave);
      jsonSave.map((task: Attivita) => this.allTodoList.push(new Attivita(task.title, task.id, task.done)));
    }
  }

  cookieReadSaveJSON(): void{
    let cookieSave = "" + this.cookieService.get("save");
    if(cookieSave != ""){
      let jsonSave = JSON.parse(cookieSave);
      jsonSave.map((task: Attivita) => this.allTodoList.push(new Attivita(task.title, task.id, task.done)));
    }
  }

  testAPI(): void{
    let payload = {
        "operation":"create",
        "tableName":"MiloToDo",
        "payload":{
            "Item":{
                "id":"asd7777",
                "test":"prova 2",
                "done":false
            }
        }
    };

    this.httpClient.post(
      "https://bh53gs360j.execute-api.us-west-2.amazonaws.com/Dev/milotodo",
      payload,
      {
        headers: new HttpHeaders().set("content-type","application/json")
      }
    ).subscribe();
  }

}
