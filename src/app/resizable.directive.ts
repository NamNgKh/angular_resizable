import { EdgeResizeHandler, NEdgeReszieHandler, SEdgeReszieHandler } from './resize-handler';
import { HostListener } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {

  @HostBinding("style.cursor") cursor: string;
  @HostBinding("style.width.px") width: number = 300;
  @HostBinding("style.height.px") height: number = 200;
  mouseDown = new Subject<MouseEvent>();
  mouseMove = new Subject<MouseEvent>();
  mouseUp = new Subject<MouseEvent>();
  nhandler: EdgeResizeHandler;

  constructor(protected elementRef: ElementRef) {
    this.nhandler = new SEdgeReszieHandler(this, this.mouseDown, this.mouseMove, this.mouseUp);
  }

  getClientRect = (): ClientRect => {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  @HostListener("mousedown", ["$event"])
  onMouseDown = (event: MouseEvent) => {
    this.mouseDown.next(event);
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove = (event: MouseEvent) => {
    this.mouseMove.next(event);
  }

  @HostListener("mouseup", ["$event"])
  onMouseUp = (event: MouseEvent) => {
    this.mouseUp.next(event);
  }

}
