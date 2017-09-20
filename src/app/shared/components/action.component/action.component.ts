import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from 'angust/src/store';
import {AuthConfig} from '../../../configs/store/store.init';

type ActionObj = {priority: string, listID: number, taskID?: number};
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'action-cmpnnt',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css']
})

export class ActionComponent implements OnInit {
    @Input() actionList: ActionObj;
    @Output() editItem  = new EventEmitter<any>();
    private list: AuthConfig;
    private task: AuthConfig;
    constructor(
        protected store: Store<any>
    ) {
        this.list = this.store.manager().LIST_CNFG;
        this.task = this.store.manager().TASK_CNFG;
    }
    ngOnInit() { }
    changePriority(obj: ActionObj) {
        const l = this.store.manager().data[obj.listID];
        switch (obj.priority) {
            case 'primary':
                (obj.taskID >= 0)
                ? l.tasks[obj.taskID].priority = 'warn'
                : l.priority = 'warn';
                break;
            case 'warn':
                (obj.taskID >= 0)
                    ? l.tasks[obj.taskID].priority = 'primary'
                    : l.priority = 'primary';
                break;
        }
    }
    edit(o: any, obj: ActionObj) {
        return this.editItem.emit({cnfg: obj.taskID >= 0 ? o.task : o.list, action: obj});
    }
    remove(obj: ActionObj) {
        const l = this.store.manager().data[obj.listID];
        (obj.taskID || obj.taskID === 0)
            ? l.tasks.splice(obj.taskID, 1)
            : this.store.manager().data.splice(obj.listID, 1);
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
