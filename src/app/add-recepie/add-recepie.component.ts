import { Component, Input, OnInit,Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
// importing RecepieService
import { RecepiesService } from '../recepies.service';
import { ActivatedRoute, Router } from '@angular/router';
// Custom Library
import { ImageUploaderComponent } from 'image-uploader';
import { SessionStorageService } from 'ngx-webstorage';
import { Title } from '@angular/platform-browser';

export interface Ingredient {
  name: string;
}
export interface Process{
  step: string;
}

@Component({
  selector: 'app-add-recepie',
  templateUrl: './add-recepie.component.html',
  styleUrls: ['./add-recepie.component.css']
})
export class AddRecepieComponent implements OnInit {  
 constructor(private saveRecepie: RecepiesService, private http: HttpClient, private router: Router, private titleService: Title, private session:SessionStorageService) { }
  
 ngOnInit() {
  this.titleService.setTitle('Add a new Recipe');
 } 
 
 processValText = '';

 exampleForm = new FormGroup ({
    recepieName: new FormControl(),
    recepieAbout: new FormControl(),
    recepieProcess: new FormControl(),
    recepieIngredient: new FormControl(),
   // imageURL: new FormControl(),
 });

 /* 
  * Chip Events
  */
  visible = true; selectable = true;
  removable = true; addOnBlur = true;

  process: Process[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ingredients: Ingredient[] = [
    { name: 'Salt' },
    { name: 'Pepper' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.ingredients.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(Ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(Ingredient);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

 /* 
  *  Process Events 
  */
  addProcess(processVal: string) {
      this.process.push({ step: processVal });
      this.processValText = '';
  }

  deleteProcess(index){
    this.process.splice(index,1);
  }

/* Total Submit */

  onSubmit(event){
    let imagePath = this.session.retrieve('imageURL');
    
    if (imagePath != null && imagePath != ''){
      console.log('Session Variable inside app:'+ imagePath);  
      /* Change URL with the library URL */
      let imgURL = imagePath;
      //const imgURL = "/assets/default.jpg"
      console.log('imgURL:'+ imgURL);
      let data = {
        "recepieName": this.exampleForm.value.recepieName,
        "recepieAbout": this.exampleForm.value.recepieAbout,
        "recepieIngredients": this.ingredients,
        "recepieProcess": this.process,
        "recepieImgPath": imgURL,
      }
  
      return this.http.post('/api/addRecepie', data).subscribe((res) => {
        let id = res['_id'];
       this.router.navigate(['/recepie', id]);
        }, (err) => {
          console.log('some error');
          console.log(JSON.stringify(err));
        });
    }else{
      alert('Please Upload a Image First');
    } 
  }
}
