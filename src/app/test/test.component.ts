import { Component, OnInit} from '@angular/core';
import { Attivita } from '../models/attivita.model';

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

  constructor() { 
    this.todoTitle = "";
    this.allTodoList = [];
    this.loadedTodoArray = [];
    this.filter = "all";
  }

  ngOnInit(): void {
  }

  //Update new ToDo title on input/text change
  onChangeTodoTitle(title: string): void {
    this.todoTitle = title;
  }

  //Add new ToDo
  todoAdd(): void {
    if(this.todoTitle != "" && this.todoTitle != " "){
      this.allTodoList.push(new Attivita(this.todoTitle));
      this.todoTitle = "";
      this.changeView(this.filter);
    }
  }

  //Delete selected ToDo
  // todoDelete(i:number): void{
  //   console.log("elimino "+i);
  //   // delete this.elemArray[i];
  //   this.allTodoList.splice(i,1);
  //   this.changeView(this.filter);
  // }

  //Delete selected ToDo
  todoDelete(key: Attivita): void{
    // delete this.elemArray[i];
    // this.allTodoList.splice(i,1);
    this.allTodoList = this.allTodoList.filter(item => item !== key);
    this.changeView(this.filter);
  }

  //Delete all ToDo
  todoDeleteAll(){
    this.allTodoList.splice(0);
    this.changeView(this.filter);
  }

  //Set selected ToDo done or not done
  toggleDone(todo: Attivita): void{
    todo.toggleAttivita();    
    this.changeView(this.filter);
  }

  //Set listed ToDo
  changeView(condition: any){
    this.filter = condition;
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

}
