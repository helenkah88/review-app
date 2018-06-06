import { Injectable } from "@angular/core";

@Injectable()
export class GoogleService {

	private google;
	private initCallbacks = [];

	constructor() {
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

		if(this.initCallbacks.length) {
			this.initCallbacks.forEach(({className, methodName, args}) => {
				switch (className) {
				case "Map":
					return new this.google.maps[className](...args);
				case "Geocoder":
					let obj = new this.google.maps[className]();
					obj[methodName](...args);
					break;
				default:
					break;
			}
			});
		}
	}

	callGoogleMethod(className, methodName, args) {
		if(this.google) {
			switch (className) {
				case "Map":
					console.log(this);
					return new this.google.maps[className](...args);
				case "Geocoder":
					let obj = new this.google.maps[className]();
					obj[methodName](...args);
					console.log(this);
					break;
				default:
					break;
			}
		} else {
			this.initCallbacks.push({className, methodName, args});
		}
	}
}