import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {

  @HostBinding("style.cursor") cursor: string;
  @HostBinding("style.width.px") width: number;
  @HostBinding("style.height.px") height: number;

  constructor(protected elementRef: ElementRef) { }

  getClientRect = (): ClientRect => {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

}
