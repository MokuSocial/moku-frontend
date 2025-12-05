import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback], ion-img[appImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() appImgFallback = 'assets/images/placeholder.png';

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.setImage();
  }

  @HostListener('ionError')
  onIonError() {
    this.setImage();
  }

  private setImage() {
    if (this.el.nativeElement.src !== this.appImgFallback) {
      this.el.nativeElement.src = this.appImgFallback;
    }
  }
}
