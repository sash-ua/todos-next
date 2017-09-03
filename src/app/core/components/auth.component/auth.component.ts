import {Component, OnInit, HostBinding} from '@angular/core';
import {toggleBoolean} from '../../../services/functional/functions';
import {Either} from 'monad-ts/src/either';
import {AnimationsServices} from '../../../services/animation.service/animations.service';
import {Store} from 'angust/src/store';
import {StateStore, AuthConfig} from '../../../configs/store/store.init';
import {ErrorM} from 'monad-ts/src/error';

@Component({
    selector: 'auth-cmpnnt',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
    animations: [
        AnimationsServices.animatonThreeStates(
            'routeAnimationUpDown',
            {opacity: 1, transform: 'translateX(0)'},
            [{opacity: 0, transform: 'translateX(100%)'}, {opacity: 0, transform: 'translateX(100%)'}],
            ['0.3s ease-in', '0.3s ease-out']
        )
    ]
})

export class AuthComponent implements OnInit {
    private f: string;
    private active: string;
    public logInCnfg: AuthConfig;
    public signInCnfg: AuthConfig;
    public resetCnfg: AuthConfig;
    @HostBinding('@routeAnimationUpDown') routeAnimationUpDown: AnimationsServices = true;
    @HostBinding('style.display') display = 'inline-table';

    constructor(
        protected store: Store<StateStore>
    ) {
        this.logInCnfg  = this.store.manager().LOG_AUTH_CNFG_COMP;
        this.signInCnfg = this.store.manager().SIGN_AUTH_CNFG_COMP;
        this.resetCnfg  = this.store.manager().RESET_AUTH_CNFG_COMP;
    }

    ngOnInit() { }
    // Either monad example
    protected configAuthForm(obj: AuthConfig) {
        const r: any = (v: boolean) => {
            let s: boolean;
            s = toggleBoolean(v);
            this.active = s ?  obj.active : '';
            return s;
        };
        const l: any = (): boolean => {
            this.f = obj.btnName;
            this.active = obj.active;
            return true;
        };
        // If press the same button as previous it produces `true`.
        const cond = () => obj.btnName === this.f;
        // Dispatcher open / close auth form.
        const res = new ErrorM().bind((d: any) => new Either(r, l).bind(cond, d), this.store.manager().isVisible);
        this.store.manager({
            // Remove add / edit list / task form.
            addItem: {isVisible: false, listID: null},
            isVisible: res,
            overlayOn: res,
            formInitData: obj
        });
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
