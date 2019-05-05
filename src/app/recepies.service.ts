import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';


@Injectable({
  providedIn: 'root'
})
export class RecepiesService {

  constructor(private http: HttpClient) { }
  
  // All Recepies
  getAllRecepies(): Observable<any> {
    return this.http.get('/api/recepies')
  }
  // Single Recepie
  recepieInfo(id){
    let recepieId = id
    console.log(recepieId)
  }

  // Add Recepie
  addRecepie(data): Observable<any>{
   // let recepie = data
   //console.log(recepie);

    return this.http.post('/api/addRecepie/', {
      data
    })  
  }  

  // Delete Recepie
  deleteRecepie(id){
    let recepieId = id
    console.log(recepieId)
  }
  // Update Recepie
  updateRecepie(data){
    let recepie = data
    console.log(recepie)
  }

}