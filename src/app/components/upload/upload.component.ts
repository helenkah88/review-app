import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CreateComponentService } from '../../shared/services/create-component.service';

@Component({
  selector: 'review-app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {
/*
  @ViewChild('progress', { read: ElementRef}) text: ElementRef;
  @Output() private addNewDragEmitter: EventEmitter<any> = new EventEmitter();*/

  uploadFile: any = {};
  highlight: boolean = false;/*
  progressDisplay: string = 'none';
  btnDisplay: string = 'none';*/

  constructor(private elem: ElementRef, private createComponentService: CreateComponentService) {
  }

  ngOnInit() {
  }
/*
  uploadImg(file) {
    this.progressDisplay = 'block';
    this.btnDisplay = 'none';
  }*/

  dragover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.highlight = true;
  }

  dragleave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.highlight = false;
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.highlight = false;

    let file = e.dataTransfer.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // this.addNewDragEmitter.emit();
      this.createComponentService.create(UploadComponent);
      this.createComponentService.addFile(file);
      // this.btnDisplay = 'block';
      this.elem.nativeElement.querySelector('h5').remove();
      this.uploadFile.src = reader.result;
    }
  }

}
