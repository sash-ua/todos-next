import {Injectable, Renderer2} from '@angular/core';
import {ErrorHandlerService} from '../error.handler.service/error.handler.service';
import {checkPathElByID} from '../functional/functions';
import {Store} from 'angust/src/store';
import {StateStore} from '../../configs/store/store.init';
import {debounceTime} from 'monad-ts';
import {clone} from 'monad-ts/src/services/clone';

@Injectable()
export class DragNDropService {
    public dragOverHandlerDebounced: any;
    constructor(
        public err: ErrorHandlerService,
        protected  rnr2: Renderer2,
        public store: Store<StateStore>
    ) {
        // Debounce `dragover` event.
        this.dragOverHandlerDebounced = debounceTime(this.dragOverHandler.bind(this), 10);
    }
    dragStartHandler(ev: any): void {
        // Add this element's id to the drag payload
        ev.dataTransfer.setData('text/plain', ev.target.id);
    };
    dragOverHandler(ev: DragEvent): void {
        if (checkPathElByID(ev.target, /list/, this.rnr2) >= 0) {
            ev.preventDefault();
        }
        ev.dataTransfer.dropEffect = 'copy';
    };
    dragDropHandler(ev: DragEvent): void {
        ev.preventDefault();
        // Definition of target list.
        const idIn = checkPathElByID(ev.target, /list/, this.rnr2);
        // Definition of donor list.
        if (idIn >= 0) {
            const store = this.store.manager();
            const idOut = ev.dataTransfer.getData('text/plain');
            const listID = idOut.replace(/[^\d]+[\d]+/, '');
            const taskID = idOut.replace(/[\d]+[\D]+/, '');
            const donor = clone(store.data[listID].tasks[taskID]);
            donor.id = store.data[idIn].tasks.length;
            store.data[idIn].tasks.push(donor);
        }
    };
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
