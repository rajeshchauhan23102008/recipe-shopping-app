import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  //toggleOpenClass: boolean = false;

  @HostBinding('class.open') toggleOpenClass: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') click(eventData: Event) {
    this.toggleOpenClass = !this.toggleOpenClass;

    // this.renderer.setAttribute(this.element.nativeElement, 'class', this.toggleOpenClass ? 'open' : '');

    // if (this.toggleOpenClass) {
    //     this.renderer.addClass(this.element.nativeElement, 'open');
    // } else {
    //     this.renderer.removeClass(this.element.nativeElement, 'open');
    // }
  }
}
