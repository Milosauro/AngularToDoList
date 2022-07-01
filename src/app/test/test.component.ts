import { Component, OnInit} from '@angular/core';
import { Attivita } from '../models/attivita.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  prova: string;
  elemArray: Attivita[];  
  viewArray: Attivita[];
  filter: any;

  constructor() { 
    this.prova = "";
    this.elemArray = [];
    this.viewArray = [];
    this.filter = "all";
  }

  ngOnInit(): void {
  }

  provaFunc(): void {
    if(this.prova != "" && this.prova != " "){
      this.elemArray.push(new Attivita(this.prova));
      this.prova = "";
      this.changeView(this.filter);
    }
  }

  cambiaFunc(varia: string): void {
    this.prova = varia;
  }

  eliminaElem(i:number): void{
    console.log("elimino "+i);
    // delete this.elemArray[i];
    this.elemArray.splice(i,1);
  }

  toggleDone(todo: Attivita): void{
    todo.toggleAttivita();    
    this.changeView(this.filter);
  }

  clearAll(){
    this.elemArray.splice(0);
  }

  changeView(condition: any){
    this.filter = condition;
    if(condition == "all"){
      this.viewArray = this.elemArray;
    }
    else{
      this.viewArray = this.elemArray.filter(item => item.done === condition);
    }
  }

}
