import {Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {Store} from 'angust/src/store';
import {AnimationsServices} from '../../../services/animation.service/animations.service';
import {TaskFormComponent} from '../../../shared/components/forms.component/task.form.component/task.form.component';
import {ListFormComponent} from '../../../shared/components/forms.component/list.form.component/list.form.component';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';
import {
    AddEditArgs, MainHelperService, getTaskQntt,
    removePrevCmpnnt, Side
} from '../../../services/main.helper.service/main.helper.service';
import {List} from '../../../configs/store/store.init';
import {toggleBoolean} from '../../../services/functional/functions';


@Component({
    selector: 'main-cmpnnt',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css'],
    animations: [
        AnimationsServices.animatonThreeStates(
            'overlay',
            {opacity: 1, transform: 'translateX(0)'},
            [{opacity: 0, transform: 'translateX(0)'}, {opacity: 0, transform: 'translateX(0)'}],
            ['0.3s ease-in', '0.3s ease-out']
        )
    ]
})

export class MainComponent {
    @ViewChildren('addDACmpnnt', {read: ViewContainerRef }) addedContainers: QueryList<ViewContainerRef> ;
    @ViewChildren('editDACmpnnt', {read: ViewContainerRef }) editTaskContainers: QueryList<ViewContainerRef> ;
    @ViewChildren('editListDACmpnnt', {read: ViewContainerRef }) editListContainers: QueryList<ViewContainerRef> ;
    constructor(
        protected store: Store<any>,
        private factoryResolver: ComponentFactoryResolver,
        private hS: MainHelperService,
        public err: ErrorHandlerService
    ) {}
    trackByList(index: number, item: List): number {
        return item.id;
    }
    rmPrevComp() {
        removePrevCmpnnt({
                add: this.addedContainers,
                editList: this.editListContainers,
                editTask: this.editTaskContainers
            },
            this.store,
            getTaskQntt);
    }
    toggle(v: boolean): boolean {
        return toggleBoolean(v);
    }
    toggleClass(id: number, clss: string): void {
        const el = document.getElementById(`list${id}`);
        el.classList.contains(clss)
            ? el.classList.remove(clss)
            : el.classList.add(clss);
    }
    // Add List/Task.
    addDispatcher(obj: any) {
        const listID = obj.action.listID;
        const cnfg = obj.cnfg;
        const daCntnrs = {add: this.addedContainers, editList: this.editListContainers, editTask: this.editTaskContainers};
        const toStoreR = {
            taskData: cnfg,
            overlayOn: true,
            addItem: {
                taskVisible: true,
                prevlistID: listID,
                listID: listID},
        };
        const toStoreL = {
            listData: cnfg,
            overlayOn: true,
            addItem: {
                addListVisible: true,
                listVisible: true,
                taskVisible: false},
        };
        const rSide: Side = {
            addTypeCmpnnt: TaskFormComponent,
            containers: daCntnrs.add,
            toStoreData: toStoreR
        };
        const lSide: Side = {
            addTypeCmpnnt: undefined,
            containers: undefined,
            toStoreData: toStoreL
        };
        const data: any = {
            listID: listID,
            da: daCntnrs,
            rSide: rSide,
            lSide: lSide
        };
        const e = this.hS.trnsfrmr1(data, cond);
        if (e instanceof Error) {this.err.handleError(e); }
        function cond(objl: AddEditArgs) {
            return objl.listID >= 0;
        }
    }
    // Edit List/Task.
    editDispatcher(obj: any) {
        const listID = obj.action.listID;
        const cnfg = obj.cnfg;
        const taskID = obj.action.taskID;
        const listCurr = this.store.manager().data[listID];
        const daCntnrs = {add: this.addedContainers, editList: this.editListContainers, editTask: this.editTaskContainers};
        const toStoreR = {
            taskData: cnfg,
            overlayOn: true,
            addItem: {
                addListVisible: false,
                listVisible: false,
                taskVisible: true,
                prevlistID: listID,
                listID: listID,
                prevtaskID: taskID,
                taskID: taskID},
            editedTaskValueCnfg: {
                txtArea: taskID >= 0 ? listCurr.tasks[taskID].description : undefined,
                priority: taskID >= 0 ? listCurr.tasks[taskID].priority === 'warn' : undefined,
                // Angular Material2 DateAdapter should get date obj as value, but in a Store was saved primitive value of Date object,
                // therefore to get proper value in DateAdapter we should pass in new Date with saved primitive value.
                end: taskID >= 0 ? new Date(listCurr.tasks[taskID].end) : undefined,
            }
        };
        const toStoreL = {
            listData: cnfg,
            overlayOn: true,
            addItem: {
                addListVisible: false,
                listVisible: true,
                taskVisible: false,
                prevlistID: listID,
                listID: listID},
            editedListValueCnfg: {
                first: listCurr.name,
                txtArea: listCurr.description,
                priority: listCurr.priority === 'warn'
            }
        };
        // Executed if cond() === true
        const rSide: Side = {
            addTypeCmpnnt: TaskFormComponent,
            containers: daCntnrs.editTask,
            toStoreData: toStoreR
        };
        // Executed if cond() === false
        const lSide: Side = {
            addTypeCmpnnt: ListFormComponent,
            containers: daCntnrs.editList,
            toStoreData: toStoreL
        };
        // Data to configure interface when add/edit list/task. Adding/editing performs in `task.form.component` &`list.form.component`.
        const data: any = {
            listID: listID,
            taskID: taskID,
            listCurr: listCurr,
            da: daCntnrs,
            rSide: rSide,
            lSide: lSide
        };
        // if cond === true -> data, data.rSide else data, data.lSide.
        const e = this.hS.trnsfrmr1(data, cond);
        if (e instanceof Error) {this.err.handleError(e); }
        function cond(objl: AddEditArgs) {
            return objl.listID >= 0 && objl.taskID >= 0;
        }
    }
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
