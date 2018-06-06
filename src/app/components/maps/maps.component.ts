import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {} from '@types/googlemaps';

import { GoogleService } from '../../shared/services/google.service';
import { Review } from '../../models/review';

declare var google: any;

@Component({
  selector: 'review-app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit, OnChanges {

  @Output() public addressEmitter: EventEmitter<string> = new EventEmitter();
  @Input() private reviews: Review[];

  @ViewChild('gmap') gmap: ElementRef;

  @ViewChild('queryInput') queryInput: ElementRef;

  public map: any;
  private places: any[] = [];
  private zoom: number = 1;

  private position;
  private setMarker = function(map, location) {
    return new google.maps.Marker({
      map: map,
      position: location
    });
  }

  constructor(private route: Router, private googleService: GoogleService) {}

  ngOnInit() {
    this.position = { lat: 49.2331, lng: 28.4682};
    this.map = this.googleService.callGoogleMethod('Map', null, [this.gmap.nativeElement, {
      zoom: this.zoom,
      center: this.position
    }]);
  }

  ngOnChanges() {
    const self = this;
    if(!this.reviews.length) return;

    this.places = this.reviews.map(item => {
      return {
        placeId: item.location,
        id: item._id
      };
    });
    if(this.places.length) {
      if(this.places.length === 1) {
        this.zoom = 12;
      }
      for (let i = 0; i < this.places.length; i++) {
        this.googleService.callGoogleMethod('Geocoder', 'geocode', [{placeId: this.places[i].placeId}, (results, status) => {
          if (status !== 'OK') return;
          let marker = this.setMarker(this.map, results[0].geometry.location);
          console.log(marker);
          /*google.maps.event.addListener(marker, 'click', function() {
            self.route.navigate(['/review', self.places[i].id]);
          });*/
        }]);
      }
      if (this.places.length === 1) {
        this.googleService.callGoogleMethod('Geocoder', 'geocode', [{placeId: this.places[0].placeId}, (results, status) => {
          if (status !== 'OK') return;
          this.map.setCenter(results[0].geometry.location);
        }]);
      }
    }
  }
/*
    let autocomplete = new google.maps.places.Autocomplete(this.queryInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      let position = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
      let marker = new google.maps.Marker({
        map: this.map,
        position: position
      });
      this.map.setCenter(position);
      this.addressEmitter.emit(place.place_id);
    });*/

/*
    let marker = new google.maps.Marker({
      map: this.map,
      position: position
    });

    let info = new google.maps.InfoWindow({
      content: '<h4>ogjwp</h4>'
    });

    google.maps.event.addListener(marker, 'click', function() {
      info.open(this.map, marker);
    });*/
  // }
  

}
