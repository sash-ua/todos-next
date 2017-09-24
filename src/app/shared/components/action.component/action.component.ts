import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from 'angust/src/store';
import {AuthConfig} from '../../../configs/store/store.init';
import {LocDBService} from '../../../services/DB.service/DB.service';

type ActionObj = {priority: string, listID: number, taskID?: number};
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'action-cmpnnt',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css']
})

export class ActionComponent {
    // Pass data to component.
    @Input() actionList: ActionObj;
    // Emit edit item event.
    @Output() editItem  = new EventEmitter<any>();
    private list: AuthConfig;
    private task: AuthConfig;
    constructor(
        private store: Store<any>,
        private ldb: LocDBService
    ) {
        // Configurations that will be emitted with on-editItem event. Depends on edit task or list.
        this.list = this.store.manager().LIST_CNFG;
        this.task = this.store.manager().TASK_CNFG;
    }
    /**
     * Change priority of task/list.
     * @param {ActionObj} obj
     */
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
        // Save to firebase.
        this.ldb.updateDB(
            (obj.taskID >= 0) ? l.tasks[obj.taskID] : l,
            (obj.taskID >= 0) ? `data/${obj.listID}/tasks/${obj.taskID}` : `data/${obj.listID}`
        );
    }
    /**
     * Emit edit item event.
     * @param o
     * @param {ActionObj} obj
     */
    edit(o: any, obj: ActionObj) {
        return this.editItem.emit({cnfg: obj.taskID >= 0 ? o.task : o.list, action: obj});
    }
    /**
     * Remove task/list.
     * @param {ActionObj} obj
     */
    remove(obj: ActionObj) {
        const l = this.store.manager().data[obj.listID];
        if (obj.taskID >= 0) {
            l.tasks.splice(obj.taskID, 1);
            this.ldb.updateDB(l, `data/${obj.listID}`);
        } else {
            this.store.manager().data.splice(obj.listID, 1);
            this.ldb.saveToDB( this.store.manager().data, `data`);
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
