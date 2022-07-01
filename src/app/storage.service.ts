import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //Push data in storage
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  //Get data from storage
  public getData(key: string) {
    return localStorage.getItem(key)
  }

  //Remove element from storage
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  //Erase storage
  public clearData() {
    localStorage.clear();
  }
}
