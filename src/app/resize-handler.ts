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
	protected subs: Subscription[] = [];
	drag = false;
	protected x: number;
	protected y: number;
	protected delta = 3;

	constructor(
		protected component: ResizableDirective,
		protected mouseDown: Subject<MouseEvent>,
		protected mouseMove: Subject<MouseEvent>,
		protected mouseUp: Subject<MouseEvent>
	) {
		this.subs.push(this.mouseDown.subscribe(event => this.onMouseDown(event)));
		this.subs.push(this.mouseMove.subscribe(event => this.onMouseMove(event)));
		this.subs.push(this.mouseUp.subscribe(event => this.onMouseUp(event)));
	}

	ngOnInit() {

	}

	ngOnDestroy() {
		this.subs.forEach(x => x.unsubscribe());
	}
}

export class NEdgeReszieHandler extends EdgeResizeHandler {
	resizable = (event: MouseEvent): boolean => {
		let rect = this.component.getClientRect();
		if (Math.abs(event.clientY - rect.top) <= this.delta
			&& rect.left <= event.clientX
			&& event.clientX <= rect.left + rect.width) {
			return true;
		}
		return false;
	}

	onMouseMove = (event: MouseEvent) => {
		if (this.resizable(event)) {
			this.component.cursor = "ns-resize";
		}
		else {
			this.component.cursor = "default";
		}
		if (this.drag) {
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

export class SEdgeReszieHandler extends EdgeResizeHandler {
	resizable = (event: MouseEvent): boolean => {
		let rect = this.component.getClientRect();
		if (Math.abs(event.layerY - rect.top - rect.height) <= this.delta
			&& rect.left <= event.layerX
			&& event.layerX <= rect.left + rect.width) {
			return true;
		}
		return false;
	}

	onMouseMove = (event: MouseEvent) => {
		if (this.resizable(event)) {
			this.component.cursor = "ns-resize";
		}
		else {
			this.component.cursor = "default";
		}
		if (this.drag) {
			this.component.height += event.clientY - this.y;
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