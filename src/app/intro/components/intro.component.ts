import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carousel, IndicatorAnimation } from 'nativescript-carousel';
import { isAndroid } from 'tns-core-modules/platform';
import { alert } from 'tns-core-modules/ui/dialogs';
import { Http } from "@angular/http";
import { Observable, EventData } from 'tns-core-modules/data/observable';
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { Page } from "tns-core-modules/ui/page/page";

let myCarousel: Carousel;

const pageData = new Observable();

// pageData.set('myDataArray', [
//   { title: 'Slide 1', color: '#b3cde0', image: '~/res/01.jpg' },
//   { title: 'Slide 2', color: '#6497b1', image: '~/res/02.jpg' },
//   { title: 'Slide 3', color: '#005b96', image: '~/res/03.jpg' },
//   { title: 'Slide 4', color: '#03396c', image: '~/res/04.jpg' }
// ]);

exports.pageLoaded = args => {
  const page = args.object;
  page.bindingContext = pageData;
  myCarousel = page.getViewById('myCarousel');
};

// exports.selectPageEvent = args => {
//   if (!myCarousel) alert("hello");
//   if (myCarousel.selectedPage == 1){
//     alert("hello");
//   }
// };

exports.myChangeEvent = function(args) {
  var changeEventText = 'Page changed to index: ' + args.index; 
  alert("sdcsbhcb");
  console.log(changeEventText);
};

// exports.myScrollingEvent = args => {
//   console.log('Scrolling: ' + args.state.offset);
// };

@Component({
  selector: "intro",
  moduleId: module.id,
  templateUrl: "./intro.component.html",
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewInit {

  done:boolean = false;
  constructor(private page: Page, private routerExtensions: RouterExtensions) {
    // this.page.actionBarHidden = true;
  }

  @ViewChild('myCarousel') carouselRef: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // const carousel = this.carouselRef.nativeElement as Carousel;
    // if (isAndroid) {
    //   setTimeout(() => {
    //     // carousel.indicatorAnimation = IndicatorAnimation.WORM;
    //     alert({
    //       message: 'The indicator animation has changed from SWAP to WORM. View the items.component.ts to see how.',
    //       okButtonText: 'Okay'
    //     });
    //   }, 5000);
    // }
  }

  onFabTap(): void {
    this.routerExtensions.navigate(["/home"]);
  }

}