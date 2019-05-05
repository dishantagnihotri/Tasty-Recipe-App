import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html'
})
export class ReceipeDetailComponent implements OnInit {
 // recepie = {};
  public recepie: any= { 
                      recepieName: '',
                      recepieImgPath: '',
                      recepieAbout: '',
                      recepieIngredients: '',
                      recepieProcess: ''
  }; 


  constructor(private route: ActivatedRoute, private http: HttpClient,  private titleService: Title) { }

  ngOnInit() {
    this.getRecepieDetail(this.route.snapshot.params['id']);
    this.titleService.setTitle('Recipe Details');
  }

  getRecepieDetail(id){
    this.http.get('/api/recepie/' + id).subscribe(data => {
      this.recepie = data;
    })
  }
}
