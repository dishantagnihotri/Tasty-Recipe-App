import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing Module
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Angular Components
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material Animations &  Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatCheckboxModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatGridListModule, MatIconModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

// importing components
import { AppComponent } from './app.component';
import { ReceipesComponent } from './receipes/receipes.component';
import { ReceipeDetailComponent } from './receipes/receipe-detail/receipe-detail.component';
import { AddRecepieComponent } from './add-recepie/add-recepie.component';
import { UpdateRecepieComponent } from './update-recepie/update-recepie.component';

// services 
import { RecepiesService } from './recepies.service';

// fix for an error ref: https://github.com/angular/angular/issues/20339
import { HttpClientModule } from '@angular/common/http'; 
//import { Http, HttpModule } from '@angular/http';

//flexbox
import { FlexLayoutModule } from "@angular/flex-layout";

// Custom Library
import { ImageUploaderModule } from 'image-uploader';
// Sessions
import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    ReceipesComponent,
    ReceipeDetailComponent,
    AddRecepieComponent,
    UpdateRecepieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,

    // Material Modules
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatListModule,
    FlexLayoutModule,
    FormsModule,

    // fixing error  
    HttpClientModule,

    // Custom Library
    ImageUploaderModule,
    NgxWebstorageModule.forRoot(),
    //Routing
    RouterModule.forRoot([
      {
        path: '',
        component: ReceipesComponent,
        data: { title: 'Find tasty Recepies' }
      },
      {
        path: 'recepie/:id',
        component: ReceipeDetailComponent,
        data: { title: 'Recipe Details' }
      },
      {
        path: 'add-recepie',
        component: AddRecepieComponent,
        data: { title: 'Add a new Recipe' }
      },
      {
        path: 'update-recepie/:id',
        component: UpdateRecepieComponent,
        data: { title: 'Update a Recipe' }
      },
      { 
        path: '**',
        redirectTo: '/'
      }
    ])
  ],
  providers: [ RecepiesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
