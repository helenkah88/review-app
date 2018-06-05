import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {} from '@types/googlemaps';
import { Review } from '../../models/review';

declare var google: any;

@Component({
  selector: 'review-app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit, OnChanges {

  @Output() private addressEmitter: EventEmitter<string> = new EventEmitter();
  @Input() public places: any[];
  @Input() private reviews: Review[];

  @ViewChild('gmap') gmap: ElementRef;

  @ViewChild('queryInput') queryInput: ElementRef;

  map: any;
  private zoom: number = 1;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    const self = this;
    let geocoder = new google.maps.Geocoder;

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
        geocoder.geocode({placeId: this.places[i].placeId}, (results, status) => {
          if (status !== 'OK') return;
          let marker = setMarker(this.map, results[0].geometry.location);
          google.maps.event.addListener(marker, 'click', function() {
            self.route.navigate(['/review', self.places[i].id]);
          });
        });
      }
      if (this.places.length === 1) {
        geocoder.geocode({placeId: this.places[0].placeId}, (results, status) => {
          if(status !== 'OK') return;
          this.map.setCenter(results[0].geometry.location);
        })
      }
    }

    function setMarker(map, location) {
      return new google.maps.Marker({
        map: map,
        position: location
      });
    }
  

  // ngAfterViewInit() {
    let position = { lat: 49.2331, lng: 28.4682};
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      zoom: this.zoom,
      center: position
    });

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
    });

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

}
