import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Store} from 'angust/src/store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'copy-task-cmpnnt',
    template: `
     <div class="dragable"
          id="{{idx}}"
          [draggable]="true"
          title="Drag-n-drop to copy">
         <mat-icon [color]="store.manager().theme.main.dNd" class="md-icon__passive">open_with</mat-icon>
     </div>
    `,
    styles: ['.dragable{background-color: #cfd8dc; display: inline-flex;}']
})

export class CopyTaskComponent<T> {
    @Input() idx: string;
    constructor(
        private store: Store<T>
    ) { }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
