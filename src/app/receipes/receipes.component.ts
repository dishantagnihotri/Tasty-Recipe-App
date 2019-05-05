import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// importing Recepie Service
import { RecepiesService } from '../recepies.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  providers: [ RecepiesService ]
})
export class ReceipesComponent implements OnInit {

    recepies: any = [];

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private RecepiesService: RecepiesService,private titleService: Title) { }
    // service is private so we can't access it, so we copied it to another 

    ngOnInit() {
       this.RecepiesService.getAllRecepies().subscribe(recepies => {
       this.recepies = recepies;
       this.titleService.setTitle('All Recipes');
      });
    }

    // delete Recepie
    deleteRecepie(id){ 
      this.http.delete('/api/deleteRecepie/' + id)
        .subscribe(res => {
            this.router.navigate(['/']);
          }, (err) => {
            console.log(JSON.stringify(err));
          }
        );
    }
}
