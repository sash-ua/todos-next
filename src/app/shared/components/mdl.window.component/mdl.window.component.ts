import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from 'angust/src/store';
import {EventHandlerService} from '../../../services/event.handlers.service/event.handler.service';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mdl-window',
    templateUrl: 'mdl.window.component.html',
    styleUrls: ['mdl.window.component.css'],
    providers: [
        EventHandlerService,
        ErrorHandlerService
    ]
})

export class MdlWindowComponent {
    constructor(
        protected store: Store<any>,
    ) {
        let to: number | undefined = this.store.manager().mdlWindowConfig.timeOut;
        if (to) {setTimeout(() => {this.store.manager({mdlWindow: false}); }, to); }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
