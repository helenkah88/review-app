import { Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef, ElementRef } from '@angular/core';

@Injectable()
export class CreateComponentService {

  files: File[] = [];

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  create(component: any) {
    let componentRef = this.resolver.resolveComponentFactory(component).create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    let domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.querySelector('.dropzone-container').appendChild(domElem);
  }

  addFile(file: File) {
    this.files.push(file);
  }

}
