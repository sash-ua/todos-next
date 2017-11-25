import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonadService} from './monad.service/monad.service';
import {LocDBService} from './DB.service/DB.service';
import {DragNDropService} from './drag-n-drop.service/drag-n-drop.service';
import {ErrorHandlerService} from './error.handler.service/error.handler.service';
import {EventHandlerService} from './event.handlers.service/event.handler.service';
import {FormGroupService} from './form.group.service/form.group.service';
import {ChangeDetectionService} from './change.detection.service/change.detection.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [],
    providers: [
        MonadService,
        LocDBService,
        DragNDropService,
        ErrorHandlerService,
        EventHandlerService,
        FormGroupService,
        ChangeDetectionService,
    ],
})
export class CoreModule {}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
