import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from 'angust/src/store';

@Component({
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
 rmOverlay() {
     this.store.manager(this.performData);
     this.store.manager().addItem.addListVisible = false;
     this.rmDAData.emit({});
 }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
