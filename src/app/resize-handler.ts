import { Subject, Subscription } from "rxjs";
import { OnInit, OnDestroy } from "@angular/core";
import { ResizableDirective } from './resizable.directive';

export class EdgeResizeHandler implements OnInit, OnDestroy {
	resizable: (event: MouseEvent) => boolean;
	onResize: () => void;
	onMouseDown: (event: MouseEvent) => void;
	onMouseOver: (event: MouseEvent) => void;
	onMouseUp: (event: MouseEvent) => void;
	onMouseMove: (event: MouseEvent) => void;
	protected subs: Subscription[];
	protected drag = false;
	protected x: number;
	protected y: number;

	constructor(
		protected component: ResizableDirective,
		protected mouseDown: Subject<MouseEvent>,
		protected mouseMove: Subject<MouseEvent>,
		protected mouseUp: Subject<MouseEvent>,
		protected mouseOver: Subject<MouseEvent>
	) { }

	ngOnInit() {
		this.subs.push(this.mouseDown.subscribe(event => this.onMouseDown(event)));
		this.subs.push(this.mouseMove.subscribe(event => {
			if (this.resizable(event))
				this.onMouseOver(event);
		}));
		this.subs.push(this.mouseUp.subscribe(event => this.onMouseUp(event)));
		this.subs.push(this.mouseOver.subscribe(event => this.onMouseOver(event)));
	}

	ngOnDestroy() {
		this.subs.forEach(x => x.unsubscribe());
	}
}

export class NEdgeReszieHandler extends EdgeResizeHandler {
	resizable = (event: MouseEvent): boolean => {
		let rect = this.component.getClientRect();
		if (rect.top == event.clientY
			&& rect.left <= event.clientX
			&& event.clientX <= rect.left + rect.width) {
			return true;
		}
		return false;
	}

	onMouseOver = (event: MouseEvent) => {
		if (this.resizable(event)) {
			this.component.cursor = "ne-resize";
		}
		else {
			this.component.cursor = "default";
		}
	}

	onMouseMove = (event: MouseEvent) => {
		if(this.drag){
			this.component.width += event.clientX - this.x;
			this.component.height += event.clientY - this.y;
			this.x = event.clientX;
			this.y = event.clientY;
		}
	}

	onMouseDown = (event: MouseEvent) => {
		if (this.resizable(event)) {
			this.drag = true;
			this.x = event.clientX;
			this.y = event.clientY;
		}
	}

	onMouseUp = (event: MouseEvent) => {
		this.drag = false;
	}
}