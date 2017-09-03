import {Component, HostBinding} from '@angular/core';
import {FN} from '../../../../core/components/f2f.validation.component/auth.form.validation.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from 'angust/src/store';
import {AnimationsServices} from '../../../../services/animation.service/animations.service';
import {Task} from '../../../../configs/store/store.init';
import {MainHelperService, Side} from '../../../../services/main.helper.service/main.helper.service';
import {ErrorHandlerService} from '../../../../services/error.handler.service/error.handler.service';

@Component({
 selector: 'task-form-component',
 templateUrl: 'task.form.component.html',
 styleUrls: ['task.form.component.css'],
    animations: [
        AnimationsServices.animatonThreeStates(
            'taskAnimation',
            {opacity: 1, transform: 'scale(1) translateX(0)'},
            [{opacity: 0, transform: 'scale(0) translateX(-100%)'},
                {opacity: 0, transform: 'scale(0) translateX(-100%)'}],
            ['0.2s ease-in', '0.2s ease-out']
        )
    ]
})

export class TaskFormComponent {
    @HostBinding('@taskAnimation') taskAnimation: AnimationsServices = true;
    @HostBinding('style.display') display = 'inline-table';
    @HostBinding('style.position') position = 'absolute';
    @HostBinding('style.right') right = 0;
    @HostBinding('style.zIndex') zIndex = 5;
    public f2fForm: FormGroup;
    public fieldsName: FN = {f3: 'description'};
    // Set values and validators of add list form.
    public addTaskCnfg = {
        [this.fieldsName.f3]: ['', [Validators.required]],
    };
    // Set values and validators of edit list form.
    public editTaskCnfg = {
        [this.fieldsName.f3]: [this.store.manager().editedTaskValueCnfg.txtArea, [Validators.required]],
    };
    constructor(
        protected store: Store<any>,
        private fb: FormBuilder,
        private hS: MainHelperService,
        private err: ErrorHandlerService,
    ) {
        // Initialize Form group.
        this.f2fForm = this.hS.initFG(this.store.manager().addItem.taskID >= 0 ? this.editTaskCnfg : this.addTaskCnfg);
    }
    // Set data in `store` depends on `cond` functions.
    addList(f2fForm: FormGroup, store: Store<any> ) {
        const taskID = this.store.manager().addItem.taskID;
        const listID = this.store.manager().addItem.listID;
        this.addItem(f2fForm, store, listID, taskID);
    }
    addItem(f2fForm: FormGroup, store: Store<any>, listID: number, taskID: number = undefined) {
        // New task.
        const newT: Task =  {
            id: taskID,
            ...f2fForm.value,
            priority: 'primary',
            start: taskID >= 0 ? store.manager().data[listID].tasks[taskID].start : undefined,
            end: Date.now() + 100};
        // Calculate task ID to add it to corresponding list.
        const idl: number = store.manager().data[listID].tasks.length;
        // Executed if cond2() === true
        const rSide: Side = {
            // Data change interface. Remove forms, set current task ID to `prevtaskID` to remove dynamically added `task` components.
            toStoreData: {overlayOn: false, addItem: {taskVisible: false, prevtaskID: taskID, taskID: null}},
            fn: () => {
                store.manager().data[listID].tasks.splice(taskID, 1, newT);
            }
        };
        // Executed if cond2() === false
        const lSide: Side = {
            // Data change interface. Remove forms, set current list ID to `prevlistID` to remove dynamically added `list` components.
            toStoreData: {overlayOn: false, addItem: {listVisible: false, prevlistID: listID, listID: null}},
            // Add new task.
            fn: () => {
                store.manager().data[listID].tasks.push({
                    id: idl,
                    ...f2fForm.value,
                    priority: 'primary',
                    start: Date.now(),
                    end: Date.now() + 100
                });
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
        const e = this.hS.trnsfrmr2(data, cond1, cond2);
        if (e instanceof Error) {this.err.handleError(e); }
        function cond1(d: any) {
            return d.f2fFormStatus;
        }
        function cond2(d: any) {
            return (d.taskID >= 0 && d.listID >= 0 && d.f2fFormStatus);
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
