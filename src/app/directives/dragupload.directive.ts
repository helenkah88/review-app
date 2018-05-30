import { Directive, HostBinding, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[reviewAppDragupload]'
})
export class DraguploadDirective {

  newfile: any = {};

  @Output() private fileChangeEmitter: EventEmitter<File> = new EventEmitter();
  @HostBinding('style.borderColor') private borderColor;
  @HostListener('dragover', ['$event']) private onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.borderColor = '#fff';
  }

  @HostListener('dragleave', ['$event']) private onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.borderColor = '#eee';
  }

  @HostListener('drop', ['$event']) private onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.borderColor = '#eee';
    let file = e.dataTransfer.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.newfile.src = reader.result;
      this.fileChangeEmitter.emit(this.newfile);
    }
  }

  constructor() { }

}
