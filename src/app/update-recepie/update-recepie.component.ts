import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Title } from '@angular/platform-browser';

export interface Ingredient {
  name: string;
}
export interface Process{
  step: string;
}

@Component({
  selector: 'app-update-recepie',
  templateUrl: './update-recepie.component.html',
  styleUrls: ['./update-recepie.component.css']
})
export class UpdateRecepieComponent implements OnInit {

  //recepie = {};

  public recepie: any = {
    _id: '', 
    recepieName: '',
    recepieImgPath: '',
    recepieAbout: '',
    recepieIngredients: '',
    recepieProcess: ''
}; 
 
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private titleService: Title) { }

ngOnInit() {
   this.titleService.setTitle('Update a Recipe');
   this.recepie = this.getRecepie(this.route.snapshot.params['id']);
  }
  getRecepie(id) {
    return this.http.get('/api/recepie/'+ id).subscribe((data : Response) => { 
      this.recepie = data;
     });
  }
  updateRecepie(id, data) {
    data.recepieImgPath = "/assets/default.jpg";

    this.http.put('/api/updateRecepie/'+id, data)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/recepie/', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }



  process: Process[] = [];
 
  ingredients: Ingredient[] = [];
 

 /* 
  * Chip Events
  */
 visible = true; selectable = true;
 removable = true; addOnBlur = true;




 readonly separatorKeysCodes: number[] = [ENTER, COMMA];


 add(event: MatChipInputEvent): void {
   const input = event.input;
   const value = event.value;

   if ((value || '').trim()) {
     this.recepie.recepieIngredients.push({name: value.trim()});
   }
   if (input) {
     input.value = '';
   }
 }

 remove(Ingredient: Ingredient): void {
   const index = this.recepie.recepieIngredients.indexOf(Ingredient);
   if (index >= 0) {
     this.recepie.recepieIngredients.splice(index, 1);
   }
 }

 /* 
  *  Process Events 
  */
 addProcess(processVal: string) {
  this.recepie.recepieProcess.push({ step: processVal });
  }

  deleteProcess(index){
  this.recepie.recepieProcess.splice(index,1);
  }


}
