import { Directive, Input, ViewContainerRef, TemplateRef, OnChanges } from '@angular/core';

@Directive({
	selector: '[reviewGoogleLoad]'
})

export class GoogleLoadDirective {
	
	private google;

	constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {

		if(!window['google']) {
			window['onGoogleInit'] = () => {
				this.initGoogle()
			};
		} else {
			this.initGoogle();
		}
	}

	initGoogle() {
		this.google = window['google'];
		this.container.createEmbeddedView(this.template);
	}
}