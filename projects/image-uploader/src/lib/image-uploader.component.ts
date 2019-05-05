import { Component, OnInit,Input,Output } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { SessionStorageService } from 'ngx-webstorage';

const URL = 'http://localhost:3000/api/upload';
  

@Component({
  selector: 'lib-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  

  imageStringURL: string = '';
  status2: boolean;
  imagePath: string = '';
  private uploadResult:any = null;

  public uploader: FileUploader = new FileUploader({ 
                                                      url: URL, 
                                                      itemAlias: 'photo'
  });

  constructor(private session:SessionStorageService) { }

  ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => { 
              file.withCredentials = false; 
              console.log('Start Uploading File');
        };
        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
              this.uploadResult = {
                                    "success": false, 
                                    "item": item,
                                    "response": response, 
                                    "status": status, 
                                    "headers": headers
                                  };
              this.status2 = false;
              console.log(this.status2)
              console.log('ImageUpload:FAILED:'+ this.uploadResult);
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
              this.uploadResult = {
                                    "success": true, 
                                    "item": item, 
                                    "response": response, 
                                    "status": status, 
                                    "headers": headers
                                  };
              alert('File uploaded successfully! You can now submit the form');
              this.imageStringURL = JSON.parse(response).filePath;
              console.log(this.imageStringURL);
              this.status2 = true;
              console.log(this.status2);
              this.handleUploadComplete();  
        }
  } 
  
  private handleUploadComplete() {
   // this.uploadResult = JSON.parse(this.uploadResult)
    //console.log("upload complete : " + this.uploadResult.response);
    //console.log("upload complete, Now FilePath: " + this.uploadResult.response.filePath);
    
    //this.imagePath = this.uploadResult.response.filePath; //undefine
  //  this.imagePath = this.uploadResult.response;


    if (this.status2 == true) {
      console.log('setting Up the session');  
      this.session.store('imageURL', this.imageStringURL);
      console.log(this.session.retrieve('imageStringURL'));

        console.log('success from function');
        console.log('setting up session value');

    } else {
        alert('fail from function');
    }
  }
}
