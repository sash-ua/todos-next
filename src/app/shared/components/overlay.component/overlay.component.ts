import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from 'angust/src/store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'overlay-cmpnnt',
    template: `<div (click)="rmOverlay()" class="overlay"></div>`,
    styleUrls: ['overlay.component.css']
})

export class OverlayComponent {
    @Input() performData: Object;
    @Output() rmDAData = new EventEmitter<any>();
 constructor(
     private store: Store<any>
 ) { }
    /**
     * Handle onRemove overlay event. It changes app's state and emit `rmDAData` event.
     */
 rmOverlay() {
     this.store.manager(this.performData);
     this.store.manager({addItem: {addListVisible: false, listID: undefined, taskID: undefined}});
     this.rmDAData.emit({});
 }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
