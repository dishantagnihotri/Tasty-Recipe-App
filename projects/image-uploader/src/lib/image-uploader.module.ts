import { NgModule } from '@angular/core';
import { ImageUploaderComponent } from './image-uploader.component';
import {  FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [ImageUploaderComponent, 
  ],
  imports: [
    FileUploadModule,
  ],
  exports: [ImageUploaderComponent]
})
export class ImageUploaderModule { }