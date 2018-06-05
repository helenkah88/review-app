import { Component, OnInit, OnChanges, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'review-app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnChanges, AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef;
  @Input() reviews: Review[];

  public slideImgs: string[] = [];
  public activeItem = 0;

  private carouselWidth = 600;
  private timer;
  private maxElements = 0;

  ngOnChanges() {
    if (this.reviews.length) {
      const reviewImages = this.reviews.filter((review) => review.reviewImgs.length);
      this.slideImgs = reviewImages.map((review) => `http://localhost:3000/${review.reviewImgs[review.reviewImgs.length - 1]}`);
      this.maxElements = this.slideImgs.length;
    }
  }

  ngAfterViewInit() {
    this.carouselWidth = this.carousel.nativeElement.offsetWidth;

    window.addEventListener('resize', () => {
      this.carouselWidth = this.carousel.nativeElement.offsetWidth;
    });
  }

  next() {
    if (this.activeItem < this.maxElements - 1) {
      this.activeItem += 1;
    }
  }

  prev() {
    if (this.activeItem !== 0) {
      this.activeItem -= 1;
    }
  }

  slideTo(index) {
    if (this.activeItem !== index) {
      this.activeItem = index;
    }
  }

  getTransformValue() {
    return `translateX(-${this.activeItem * this.carouselWidth}px)`;
  }

}
