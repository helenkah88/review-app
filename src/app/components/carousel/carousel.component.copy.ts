import { Component, OnInit, OnChanges, ElementRef, Input, ViewChild } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'review-app-carousel',
  templateUrl: './carousel.component.copy.html',
  styleUrls: ['./carousel.component.copy.sass']
})
export class CarouselComponent implements OnInit, OnChanges {

  @Input() slideImgs: string[];
  @Input() reviews: Review[] = [];
  @Input() slideTo: string;
  @ViewChild('carousel') private carousel: ElementRef;

  private elem;
  private timer;
  private activeItem;
  private activeIndicator;
  private slideList;
  private indicatorList;

  constructor(private elemWrapper: ElementRef) {
    this.elem = this.elemWrapper.nativeElement;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // http://localhost:3000/

      // console.log(this.reviews);
      if(this.reviews.length) {
          this.slideImgs = this.reviews.map(review => {
            if(!review.reviewImgs.length) return;
            return review.reviewImgs[review.reviewImgs.length - 1];
          });
          setTimeout(() => {
            let firstSlide = this.carousel.nativeElement.querySelector('.slide');
            this.activeItem = firstSlide;
            let firstIndicator = this.carousel.nativeElement.querySelector('.indicator');
            firstIndicator.classList.add('active');
            this.activeIndicator = firstIndicator;
            this.slideList = this.elem.querySelectorAll('.slide');
            this.indicatorList = this.elem.querySelectorAll('.indicator');

            this.slideList.forEach((slide, i) => {
              slide.style.transform = `translate(${i*100}%)`;
            })

            this.startTimer();
    }, 0);
      }
  }

    clickHandler(e) {
        e.preventDefault();

        let target = e.target.closest('.controls') || e.target.closest('.indicator');

        if (!target) return;

        if (this.timer) this.resetTimer();

        if (target.classList.contains('controls')) {
            this.handleControls(target);
        } else if (target.classList.contains('indicator')) {
            this.handleIndicators(target);
        }
    }

    handleControls(elem) {
        let target = elem.dataset.target;

        if (target === 'next') {
            this.slideNext();
        }
        if (target === 'prev') {
            this.slidePrev();
        }
    }

    slideNext() {
        let elem = this.activeItem.nextElementSibling;
        if (!this.activeItem.nextElementSibling) {
            elem = this.activeItem.parentElement.firstElementChild;
        }
        let idx = Array.prototype.indexOf.call(this.slideList, elem);
        this.setActiveSlide(elem, idx);
        this.reset(this.activeIndicator);
        this.setActiveIndicator(this.indicatorList[idx]);
    }

    slidePrev() {
        let elem = this.activeItem.previousElementSibling;
        if (!this.activeItem.previousElementSibling) {
            elem = this.activeItem.parentElement.lastElementChild;
        }
        let idx = Array.prototype.indexOf.call(this.slideList, elem);
        this.setActiveSlide(elem, idx);
        this.reset(this.activeIndicator);
        this.setActiveIndicator(this.indicatorList[idx]);
    }

    handleIndicators(elem) {

        let target = elem.dataset.slideTo;

        this.reset(this.activeIndicator);
        this.setActiveSlide(this.slideList[target], target);
        this.setActiveIndicator(elem);
    }

    setActiveSlide(elem, idx) {
        this.activeItem = elem;
        let slides = this.carousel.nativeElement.querySelector('.slides');
        slides.style.transform = `translateX(-${idx * 100}%)`;
    }

    setActiveIndicator(elem) {
        elem.classList.add('active');
        this.activeIndicator = elem;
    }

    reset(elem) {
        elem.classList.remove('active');
    }

    resetTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }

    startTimer() {
        this.timer = setInterval(this.slide.bind(this), 4000);
    }

    slide() {
        let elem = this.activeItem.nextElementSibling;

        if (!this.activeItem.nextElementSibling) {
            elem = this.activeItem.parentElement.firstElementChild;
        }
        let idx = Array.prototype.indexOf.call(this.slideList, elem);
        this.setActiveSlide(elem, idx);
        this.reset(this.activeIndicator);
        this.setActiveIndicator(this.indicatorList[idx]);
    }
}
