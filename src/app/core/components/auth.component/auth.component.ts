import {Component, OnInit, HostBinding} from '@angular/core';
import {toggleBoolean} from '../../../services/functional/functions';
import {Either} from 'monad-ts/src/either';
import {AnimationsServices} from '../../../services/animation.service/animations.service';
import {Store} from 'angust/src/store';
import {StateStore, AuthConfig} from '../../../configs/store/store.init';
import {ErrorM} from 'monad-ts/src/error';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';
import {MainHelperService} from '../../../services/main.helper.service/main.helper.service';

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
    // Flag to save pressed button name.
    private f: string;
    // It's to highlight active button.
    private active: string;
    public logInCnfg: AuthConfig;
    public signInCnfg: AuthConfig;
    public resetCnfg: AuthConfig;
    @HostBinding('@routeAnimationUpDown') routeAnimationUpDown: AnimationsServices = true;
    @HostBinding('style.display') display = 'inline-table';

    constructor(
        protected store: Store<StateStore>,
        private hS: MainHelperService,
        public err: ErrorHandlerService
    ) {
        this.logInCnfg  = this.store.manager().LOG_AUTH_CNFG_COMP;
        this.signInCnfg = this.store.manager().SIGN_AUTH_CNFG_COMP;
        this.resetCnfg  = this.store.manager().RESET_AUTH_CNFG_COMP;
    }

    ngOnInit() { }
    // Either monad example
    protected configAuthForm(obj: AuthConfig) {
        // If press the same button as previous it produces `true`.
        const cond = (d: any) => d.args.btnName === this.f;
        const constPart: any = {
            isVisible: this.store.manager().isVisible,
            toStoreData: {
                addItem: {taskVisible: false, listVisible: false},
                formInitData: obj
            }
        };
        const data: any = {
            args: obj,
            rSide: {
                ...constPart,
                fn: (d: any): void => {
                    let s: boolean;
                    s = toggleBoolean(d.isVisible);
                    this.active = s ?  d.args.active : '';
                    this.store.manager({isVisible: s, overlayOn: s});
                }
            },
            lSide: {
                ...constPart,
                fn: (d: any): void => {
                    this.f = d.args.btnName;
                    this.active = d.args.active;
                    this.store.manager({isVisible: true, overlayOn: true});
                }
            }
        };
        const e = this.hS.trnsfrmr1(data, cond);
        if (e instanceof Error) {this.err.handleError((e))}
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
