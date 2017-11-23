import {AnimationEntryMetadata, Component, HostBinding} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Store} from 'angust/src/store';
import {animatonThreeStates} from '../../../core/functions/animations.service';
import {MonadService, Side} from '../../../core/monad.service/monad.service';
import {LocDBService} from '../../../core/DB.service/DB.service';
import {FormGroupService} from '../../../core/form.group.service/form.group.service';
import {Task} from 'app/configs/store/store.init';
import {FN} from '../../../shared/types/types';

@Component({
    selector: 'task-form-component',
    templateUrl: 'task.form.component.html',
    styleUrls: ['task.form.component.css'],
    animations: [
        animatonThreeStates(
            'taskAnimation',
            {opacity: 1, transform: 'scale(1) translateX(0)'},
            [{opacity: 0, transform: 'scale(0) translateX(-100%)'},
                {opacity: 0, transform: 'scale(0) translateX(-100%)'}],
            ['0.2s ease-in', '0.2s ease-out']
        )
    ],
    providers: []
})

export class TaskFormComponent {
    @HostBinding('@taskAnimation') taskAnimation: AnimationEntryMetadata = true;
    @HostBinding('style.position') position = 'absolute';
    @HostBinding('style.zIndex') zIndex = 5;
    public f2fForm: FormGroup;
    public readonly fieldsName: FN = {f3: 'description', f4: 'priority', f5: 'dueDate'};
    // Set values and validators of add list form.
    public readonly addTaskCnfg = {
        [this.fieldsName.f3]: ['', [Validators.required]],
        [this.fieldsName.f4]: [''],
        [this.fieldsName.f5]: [new Date()]
    };
    // Set values and validators of edit list form.
    public readonly editTaskCnfg = {
        [this.fieldsName.f3]: [this.store.manager().editedTaskValueCnfg.txtArea, [Validators.required]],
        [this.fieldsName.f4]: [this.store.manager().editedTaskValueCnfg.priority],
        [this.fieldsName.f5]: [new Date(this.store.manager().editedTaskValueCnfg.dueDate)]
    };
    constructor(
        private store: Store<any>,
        private hS: MonadService,
        private ldb: LocDBService,
        private fgL: FormGroupService
    ) {
        // Initialize Form group.
        this.f2fForm = this.fgL.initFG(this.store.manager().addItem.taskID >= 0 ? this.editTaskCnfg : this.addTaskCnfg);
    }
    // Set data in `store` depends on `cond` functions.
    addTask(f2fForm: FormGroup, store: Store<any> ) {
        const taskID = this.store.manager().addItem.taskID;
        const listID = this.store.manager().addItem.listID;
        this._addItem(f2fForm, store, listID, taskID);
    }
    /**
     * Add task handler.
     * @param {FormGroup} f2fForm
     * @param {Store<any>} store
     * @param {number} listID
     * @param {number} taskID
     */
    _addItem(f2fForm: FormGroup, store: Store<any>, listID: number, taskID: number = undefined) {
        let {description, priority, dueDate} = f2fForm.value;
        // Edited task.
        const editT: Task =  {
            description: description,
            priority: priority ? 'warn' : 'primary',
            dueDate: dueDate,
            start: taskID >= 0 ? store.manager().data[listID].tasks[taskID].start : new Date()};
        // FireBase didn't save empty arrays therefore we should add `tasks` with empty array to Store.data.list.
        const currL = store.manager().data[listID];
        if (!currL.tasks) {
            currL.tasks = [];
        }
        // Calculate task ID to add it to tasks of the corresponding list.
        const nextID: number = store.manager().data[listID].tasks.length;
        // New task.
        const addNewT: Task = {
            description: description,
            priority: priority ? 'warn' : 'primary',
            start: new Date(),
            dueDate: dueDate
        };
        // Executed if cond2() === true. Edit task.
        const rSide: Side = {
            // Data change interface. Remove forms, set current task ID to `prevtaskID` to remove dynamically added `task` components.
            toStoreData: {
                overlayOn: false,
                addItem: {taskVisible: false, prevtaskID: taskID, taskID: undefined},
                editedTaskValueCnfg: {dueDate: dueDate}
            },
            fn: () => {
                store.manager().data[listID].tasks.splice(taskID, 1, editT);
                this.ldb.updateDB(editT, `data/${listID}/tasks/${taskID}`);
            }
        };
        // Executed if cond2() === false. Add new task.
        const lSide: Side = {
            // Data change interface. Remove forms, set current list ID to `prevlistID` to remove dynamically added `list` components.
            toStoreData: {
                overlayOn: false,
                addItem: {taskVisible: false, listVisible: false, prevlistID: listID, listID: undefined}},
            // Add new task.
            fn: () => {
                store.manager().data[listID].tasks.push(addNewT);
                this.ldb.updateDB(addNewT, `data/${listID}/tasks/${nextID}`);
            }
        };
        // Executed if cond1() === false
        const thSide = {
            // Configure modal window with validity error.
            toStoreData: {
                mdlWindow: true,
                mdlWindowConfig: {
                    header: 'All fields required',
                    msg: '',
                    timeOut: 1800
                }
            }
        };
        // Data to configure adding/editing of task.
        const data: any = {
            f2fFormStatus: f2fForm.status === 'VALID',
            listID: listID,
            taskID: taskID,
            rSide: rSide,
            lSide: lSide,
            thSide: thSide
        };
        // if cond1 === true -> (cond2 === true -> data, data.rSide else data, data.lSide) else data, data.thSide.
        this.hS.eitherEitherErrorEitherT(`task.form.component.ts._addItem`, data, cond1, cond2);
        function cond1<CondFn>(d: any) {
            return d.f2fFormStatus;
        }
        function cond2<CondFn>(d: any) {
            return (d.taskID >= 0 && d.listID >= 0 && d.f2fFormStatus);
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
