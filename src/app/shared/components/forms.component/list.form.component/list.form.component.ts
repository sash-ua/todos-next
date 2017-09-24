import {Component, HostBinding} from '@angular/core';
import {FN} from '../../../../core/components/f2f.validation.component/auth.form.validation.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from 'angust/src/store';
import {AnimationsServices} from '../../../../services/animation.service/animations.service';
import {List, StateStore} from '../../../../configs/store/store.init';
import {ErrorHandlerService} from '../../../../services/error.handler.service/error.handler.service';
import {MainHelperService, Side} from '../../../../services/main.helper.service/main.helper.service';
import {DBService} from '../../../../embedded.modules/firebase.e.module/db.em/db.service/db.service';
import {LocDBService} from '../../../../services/DB.service/DB.service';


@Component({
    selector: 'list-form-component',
    templateUrl: 'list.form.component.html',
    styleUrls: ['list.form.component.css'],
    animations: [
        AnimationsServices.animatonThreeStates(
            'listAnimation',
            {opacity: 1, transform: 'scale(1) translateX(50%)  translateY(0)'},
            [{opacity: 0, transform: 'scale(0) translateX(-150%) translateY(-250%)'}, {opacity: 0, transform: 'scale(0)' +
            ' translateX(-150%)  translateY(-250%)'}],
            ['0.4s ease-in', '0.4s ease-out']
        )
    ],
    providers: [
        LocDBService
    ]
})

export class ListFormComponent {
    @HostBinding('@listAnimation') listAnimation: AnimationsServices = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';
    @HostBinding('style.top') top = '50px';
    @HostBinding('style.left') left = '-50px';
    @HostBinding('style.zIndex') zIndex = 4;
    public f2fForm: FormGroup;
    public fieldsName: FN = {f1: 'name', f3: 'description', f4: 'priority'};
    // Set values and validators of add list form.
    public addCnfg = {
        [this.fieldsName.f1]: ['', [Validators.required, Validators.minLength(1)]],
        [this.fieldsName.f3]: [''],
        [this.fieldsName.f4]: ['']
    };
    // Set values and validators of edit list form.
    public editCnfg = {
        [this.fieldsName.f1]: [this.store.manager().editedListValueCnfg.first, [Validators.required, Validators.minLength(1)]],
        [this.fieldsName.f3]: [this.store.manager().editedListValueCnfg.txtArea],
        [this.fieldsName.f4]: [this.store.manager().editedListValueCnfg.priority]
    };
    constructor(
        protected store: Store<StateStore>,
        private fb: FormBuilder,
        public err: ErrorHandlerService,
        public hS: MainHelperService,
        protected db: DBService,
        protected ldb: LocDBService
    ) {
        // Config. Form group. It depends on add / edit list mode (listID  = number - edit; listID = undefined - add
        // new list)
        this.f2fForm = this.hS.initFG(this.store.manager().addItem.listID >= 0 ? this.editCnfg : this.addCnfg);
    }
    /**
     * Add list handler. Change app's state depends on condition functions.
     * @param {FormGroup} f2fForm
     * @param {Store<any>} store
     */
    addList(f2fForm: FormGroup, store: Store<any>) {
        const listID = this.store.manager().addItem.listID;
        this._addItem(f2fForm, store, listID);
    }
    /**
     * Part of addList func.
     * @param {FormGroup} f2fForm
     * @param {Store<any>} store
     * @param {number} listID
     * @private
     */
    _addItem(f2fForm: FormGroup, store: Store<any>, listID: number = undefined) {
        let {name, description, priority} = f2fForm.value;
        const nextID: number = store.manager().data ? store.manager().data.length : 0;
        // Edited list
        const editL: List = {
            id: listID,
            name: name,
            description: description,
            priority: priority ? 'warn' : 'primary',
            tasks: store.manager().data[listID] && store.manager().data[listID].tasks ? store.manager().data[listID].tasks : []
        };
        // New list.
        const addNewL: any = {id: nextID, name: name, description: description, priority: priority ? 'warn' : 'primary', tasks: []};
        // Executed if cond2() === true. Edit list.
        const rSide: Side = {
            toStoreData: {overlayOn: false, addItem: {listVisible: false, prevlistID: listID, listID: undefined}},
            fn: () => {
                store.manager().data.splice(listID, 1, editL);
                this.ldb.updateDB(editL, `data/${listID}`);
            }
        };
        // Executed if cond2() === false. Add list.
        const lSide: Side = {
            toStoreData: {overlayOn: false, addItem: {listVisible: false, addListVisible: false}},
            fn: () => {
                store.manager().data.push(addNewL);
                this.ldb.saveToDB(addNewL, `data/${nextID}`);
            }
        };
        // Executed if cond1() === false
        const thSide = {
            toStoreData: {
                mdlWindow: true,
                mdlWindowConfig: {
                    header: 'All fields required',
                    msg: '',
                    timeOut: 1800
                }
            }
        };
        // Data to configure adding/editing of list.
        const data: any = {
            f2fFormStatus: f2fForm.status === 'VALID',
            listID: listID,
            rSide: rSide,
            lSide: lSide,
            thSide: thSide
        };
        // if cond1 === true -> (cond2 === true -> data, data.rSide else data, data.lSide) else data, data.thSide.
        const e = this.hS.trnsfrmr2(`list.form.component.ts._addItem`, data, cond1, cond2);
        function cond1<CondFn>(d: any) {
            return d.f2fFormStatus;
        }
        function cond2<CondFn>(d: any) {
            return (d.listID >= 0 && d.f2fFormStatus);
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
