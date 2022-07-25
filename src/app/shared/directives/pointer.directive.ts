import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[pointer]'
})
export class PointerDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.cursor = 'pointer';
   }

}
