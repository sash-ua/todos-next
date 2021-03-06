import { Injectable, Renderer2} from '@angular/core';
import {checkPathElByID} from '../functions/common';
import {Store} from 'angust/src/store';
import {StateStore} from '../../configs/store/store.init';
import {debounceTime} from 'monad-ts';
import {clone} from 'monad-ts/src/services/clone';
import {LocDBService} from '../DB.service/DB.service';

@Injectable()
export class DragNDropService {
    public dragOverHandlerDebounced: any;
    constructor(
        private rnr2: Renderer2,
        private store: Store<StateStore>,
        private ldb: LocDBService,
    ) {
        // Debounce `dragover` event.
        this.dragOverHandlerDebounced = debounceTime(this.dragOverHandler.bind(this), 10);
    }
    /**
     * Add element's id to the drag payload.
     * @param ev
     */
    dragStartHandler(ev: any): void {
        ev.dataTransfer.setData('text/plain', ev.target.id);
    };
    /**
     * Set `dragover` event.
     * @param {DragEvent} ev
     */
    dragOverHandler(ev: DragEvent): void {
        if (checkPathElByID(ev.target, /list/, this.rnr2) >= 0) {
            ev.preventDefault();
        }
        ev.dataTransfer.dropEffect = 'copy';
    };
    /**
     * Set actions when `drop` event happens.
     * @param {DragEvent} ev
     */
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
            const nextID = store.data[idIn].tasks ? store.data[idIn].tasks.length : 0;
            const list = store.data[idIn];
            donor.id = nextID;
            if (list.tasks) {
                list.tasks.push(donor);
            } else {
                list.tasks = [];
                list.tasks.push(donor);
            }
            // Save to firebase.
            this.ldb.updateDB(donor, `data/${idIn}/tasks/${nextID}`);
        }
    };
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
