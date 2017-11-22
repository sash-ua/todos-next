import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from 'angust/src/store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mdl-window',
    templateUrl: 'mdl.window.component.html',
    styleUrls: ['mdl.window.component.css'],
    providers: []
})

export class MdlWindowComponent {
    constructor(
        private store: Store<any>,
    ) {
        // Time during which the window is visible, if undefined it visible constantly.
        let to: number | undefined = this.store.manager().mdlWindowConfig.timeOut;
        if (to) {setTimeout(() => {this.store.manager({mdlWindow: false}); }, to); }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
