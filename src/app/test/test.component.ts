import { Component, OnInit} from '@angular/core';
import { empty, takeLast } from 'rxjs';
import { Attivita } from '../models/attivita.model';
import { StorageService } from '../storage.service';

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

  constructor(private storageStore: StorageService) { 
    this.todoTitle = "";
    this.allTodoList = [];
    this.loadedTodoArray = [];
    this.filter = "all";
  }

  ngOnInit(): void {
    if(this.storageStore.getData("save") == null){
      console.log("Storage empty");
      this.storageStore.clearData();
      this.storageStore.saveData("save","");
    }
    else{
      console.log("data found");
      this.storageReadSaveJSON();
    }
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
      this.allTodoList.push(task);
      this.todoTitle = "";
      this.storageSaveJSON();
    }
    this.changeView(this.filter);
  }

  //Delete selected ToDo
  todoDelete(key: Attivita): void{
    // delete this.elemArray[i];
    // this.allTodoList.splice(i,1);
    this.allTodoList = this.allTodoList.filter(item => item !== key);
    this.storageSaveJSON();
    this.changeView(this.filter);
  }

  //Delete all ToDo
  todoDeleteAll(){
    this.allTodoList.splice(0);
    this.storageSaveJSON();
    this.changeView(this.filter);
  }

  //Set selected ToDo done or not done
  toggleDone(todo: Attivita): void{
    todo.toggleAttivita();    
    this.storageSaveJSON();
    this.changeView(this.filter);
  }

  //Set listed ToDo
  changeView(condition: any){
    this.filter = condition;
    console.log("change");
    console.log(this.allTodoList);
    if(condition == "all"){
      this.loadedTodoArray = this.allTodoList;
    }
    else{
      this.loadedTodoArray = this.allTodoList.filter(item => item.done === condition);
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

  storageReadSaveJSON(): void{
    let storageSave = "" + this.storageStore.getData("save");
    let jsonSave = JSON.parse(storageSave);
    console.log("save");
    console.log(jsonSave);
    jsonSave.map((task: Attivita) => this.allTodoList.push(new Attivita(task.title, task.id, task.done)));
  }

  // storageSaveJSON(task: Attivita): void{
  //   const taskData = {  
  //     title: task.title,  
  //     done: task.done 
  //   };
  //   this.storageStore.saveData(task.id,JSON.stringify(taskData));
  // }

  // storageGetJSON(id: string): JSON{
  //   const jsonString: string = "" + this.storageStore.getData(id);
  //   let task: JSON = JSON.parse(jsonString);
  //   return task;
  // }

}
